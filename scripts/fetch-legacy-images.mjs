#!/usr/bin/env node
/**
 * Downloads the photographs from the old WordPress site into
 * src/assets/photos/, named for the slot each one fills.
 *
 * Run this once, from a machine with plain internet access:
 *     npm run migrate:images
 *
 * Astro handles the rest: every file that lands here is re-encoded to AVIF
 * with a WebP fallback and a responsive srcset at build time. The originals
 * are full-resolution uncompressed phone JPEGs — the whole point of routing
 * them through the pipeline is that those never reach a phone again.
 *
 * Nothing is hotlinked; the old site is read once and then irrelevant.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'src/assets/photos');
const PUBLIC = join(root, 'public/images');
const ORIGIN = 'https://showersdoorunlimited.com';

const { photoSlots, legacyLogo } = await import('../src/data/photos.ts')
  .catch(async () => {
    // photos.ts is TypeScript; parse the two exports we need without a compiler.
    const { readFile } = await import('node:fs/promises');
    const src = await readFile(join(root, 'src/data/photos.ts'), 'utf8');
    // Only slots that still name a legacy path; a null legacy means the
    // slot is already filled by a photograph the client supplied.
    const slots = [...src.matchAll(
      /file:\s*'([^']+)',\s*\n\s*alt:[\s\S]*?legacy:\s*\n?\s*'([^']+)'/g,
    )].map(([, file, legacy]) => ({ file, legacy }));
    const logo = src.match(/legacyLogo\s*=\s*'([^']+)'/)?.[1];
    return { photoSlots: slots, legacyLogo: logo };
  });

await mkdir(OUT, { recursive: true });
await mkdir(PUBLIC, { recursive: true });

const exists = (p) => access(p).then(() => true, () => false);

async function grab(legacyPath, destPath, label) {
  if (await exists(destPath)) {
    console.log(`  skip   ${label} (already present)`);
    return 'skipped';
  }
  const url = ORIGIN + legacyPath;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`  FAIL   ${label} — HTTP ${res.status} ${url}`);
      return 'failed';
    }
    await writeFile(destPath, Buffer.from(await res.arrayBuffer()));
    console.log(`  ok     ${label}`);
    return 'ok';
  } catch (err) {
    console.error(`  FAIL   ${label} — ${err.message}`);
    return 'failed';
  }
}

console.log(`Fetching ${photoSlots.length} photographs from ${ORIGIN}\n`);
const results = [];
for (const slot of photoSlots) {
  results.push(await grab(slot.legacy, join(OUT, slot.file), slot.file));
}
if (legacyLogo) {
  results.push(await grab(legacyLogo, join(PUBLIC, 'logo.png'), 'logo.png'));
}

const tally = (k) => results.filter((r) => r === k).length;
console.log(
  `\nDone — ${tally('ok')} downloaded, ${tally('skipped')} already present, ` +
    `${tally('failed')} failed.`,
);
if (tally('failed') > 0) {
  console.log(
    '\nFailed downloads leave a labelled placeholder on the page rather than a\n' +
      'broken image. If the old site is gone, source the photographs from the\n' +
      "client's phone or the Instagram account and drop them into\n" +
      'src/assets/photos/ using the same filenames.',
  );
}
console.log(
  '\nNEXT: open each file and confirm it matches the alt text in\n' +
    'src/data/photos.ts, then set altVerified: true. The alt text was written\n' +
    'from the slot each photo fills, not from the photo itself.',
);

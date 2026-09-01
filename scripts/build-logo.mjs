#!/usr/bin/env node
/**
 * Derives the logo variants the site needs from the master artwork in
 * src/assets/brand/logo-master.png.
 *
 * WHY THIS EXISTS: the supplied master is a single 1717x916 opaque PNG,
 * 967KB, with the mark, the wordmark and the tagline in one horizontal
 * lockup. Three problems follow from that:
 *
 *   1. At any size a site header can use (~240px wide), the tagline line
 *      renders about four pixels tall — visual noise rather than words. So a
 *      compact lockup is composited here from the mark and the two main text
 *      lines, which is ordinary primary/secondary lockup practice.
 *   2. The artwork is gold and silver on near-black with no alpha. The silver
 *      would disappear on a light background, so every variant is built for a
 *      dark surface, and the near-black ground is keyed to transparency so the
 *      mark sits cleanly on any dark colour without showing a box.
 *   3. 967KB cannot ship. Everything below is emitted as AVIF and WebP with a
 *      PNG fallback, at the sizes actually used.
 *
 * THESE ARE DERIVED ASSETS. Ask the client for official artwork — ideally an
 * SVG or a transparent PNG master, plus a stacked lockup and a mark-only file.
 * Replace src/assets/brand/logo-master.png and re-run; if the official files
 * arrive as separate lockups, use them directly and retire this script.
 *
 * Run: npm run logo:build
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'src/assets/brand/logo-master.png');
const OUT = join(root, 'public/images/brand');
const ICONS = join(root, 'public/images');
mkdirSync(OUT, { recursive: true });
mkdirSync(ICONS, { recursive: true });

// Regions measured from the master by scanning its ink profile.
const MARK = { left: 93, top: 254, width: 396, height: 415 };
const WORD_COMPACT = { left: 552, top: 360, width: 1070, height: 160 }; // name + UNLIMITED
const GAP = 64; // the gap between mark and text in the original lockup

/**
 * Keys the near-black ground to transparency using luminance as alpha.
 * Metallic artwork on black composites correctly this way onto any dark
 * surface: the darkest pixels vanish, the gold and silver stay.
 */
async function keyToAlpha(input) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // The ground measures 9-11 luminance everywhere in the master, so the
    // floor sits just above it: anything at or below 13 goes fully clear,
    // which is what stops a faint rectangle showing around the mark.
    let a = Math.round(Math.min(255, Math.max(0, (lum - 13) * 3.0)));
    out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = a;
  }
  return sharp(out, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

/** Emits the given formats at a width, and reports the sizes. */
async function emit(buf, name, width, formats, dir = OUT) {
  const base = sharp(buf).resize({ width, withoutEnlargement: true });
  const results = [];
  for (const fmt of formats) {
    const opts = { avif: { quality: 62 }, webp: { quality: 86 }, png: { compressionLevel: 9 } }[fmt];
    const info = await base.clone().toFormat(fmt, opts).toFile(join(dir, `${name}.${fmt}`));
    results.push(`${fmt} ${(info.size / 1024).toFixed(1)}KB`);
  }
  console.log(`  ${name.padEnd(18)} ${String(width).padStart(4)}px  ${results.join('  ')}`);
}

console.log('Building logo variants from the master artwork\n');

// --- 1. Compact header/footer lockup: mark + name, no tagline -------------
const markBuf = await sharp(SRC).extract(MARK).toBuffer();
const wordBuf = await sharp(SRC).extract(WORD_COMPACT).toBuffer();
const lockup = await sharp({
  create: {
    width: MARK.width + GAP + WORD_COMPACT.width,
    height: MARK.height,
    channels: 3,
    background: '#000000',
  },
})
  .composite([
    { input: markBuf, left: 0, top: 0 },
    {
      input: wordBuf,
      left: MARK.width + GAP,
      top: Math.round((MARK.height - WORD_COMPACT.height) / 2),
    },
  ])
  .png()
  .toBuffer();
console.log('Compact lockup — header and footer (tagline dropped, set as text instead)');
await emit(await keyToAlpha(lockup), 'logo-lockup', 720, ['avif', 'webp', 'png']);

// --- 2. Full lockup — the schema `logo` value and the Open Graph source ---
// PNG only: both consumers want one plain raster URL, not a picture element.
const fullKeyed = await keyToAlpha(
  await sharp(SRC).extract({ left: 93, top: 254, width: 1529, height: 415 }).toBuffer(),
);
console.log('Full lockup — schema logo and OG card source');
await emit(fullKeyed, 'logo-full', 800, ['png']);

// --- 3. Icons, cut from the mark -----------------------------------------
// The mark is taller than it is wide, so it is centred with padding on the
// brand's own near-black; iOS touch icons cannot carry transparency.
const markKeyed = await keyToAlpha(markBuf);
console.log('Icons (from the monogram)');
for (const [name, size] of [['favicon-32', 32], ['favicon-512', 512], ['apple-touch-icon', 180]]) {
  const inner = Math.round(size * 0.74);
  const fitted = await sharp(markKeyed).resize({ height: inner, fit: 'inside' }).toBuffer();
  const m = await sharp(fitted).metadata();
  const info = await sharp({
    create: { width: size, height: size, channels: 4, background: '#0f0e0d' },
  })
    .composite([
      { input: fitted, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) },
    ])
    // The icons sit on an opaque ground, so the alpha channel is dead weight
    // and a palette is more than enough for a monogram at icon sizes.
    .flatten({ background: '#0f0e0d' })
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toFile(join(ICONS, `${name}.png`));
  console.log(`  ${name.padEnd(18)} ${String(size).padStart(4)}px  png ${(info.size / 1024).toFixed(1)}KB`);
}

console.log('\nDone. The monogram is not published on its own — it exists only');
console.log('as the source for the icons above.');

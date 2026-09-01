#!/usr/bin/env node
/**
 * Regenerates the self-hosted webfonts in public/fonts/.
 *
 * Two things happen here, and both are why the fonts are small:
 *
 *  1. Archivo ships with a width axis (62%-125%). This design uses exactly one
 *     width, 118%, on every heading, so the axis is instanced away with
 *     fontTools and the expanded width is baked into the file. That alone
 *     takes it from 90KB to ~32KB with no visible difference, because nothing
 *     on the site ever animates or varies the width.
 *
 *  2. Both families are subset to Latin-1 plus General Punctuation. This is a
 *     deliberately conservative range — accented characters for names, curly
 *     quotes, em dashes and the prime marks used for glass thicknesses all
 *     survive, because the agency will be editing this copy later and a
 *     tight per-page subset would break the first time someone typed a
 *     character that was not on the site when it was built.
 *
 * Requires fontTools:  pip install "fonttools[woff]"
 * Run:                 npm run fonts:build
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'public/fonts');
const TMP = join(root, 'node_modules/.font-build');
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

const UNICODES = [
  'U+0000-00FF', // Basic Latin + Latin-1 Supplement (accented names)
  'U+0131', 'U+0152-0153', 'U+02BB-02BC',
  'U+2000-206F', // General Punctuation: em dash, curly quotes, prime marks
  'U+2074', 'U+20AC', 'U+2122', 'U+2190-2193', 'U+2212', 'U+FEFF',
].join(',');

const LAYOUT = 'kern,liga,calt,ccmp,locl,mark,mkmk';
const kb = (p) => (statSync(p).size / 1024).toFixed(1) + 'KB';

const run = (cmd, args) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });

// --- Archivo: instance the width axis to 118%, then subset ----------------
const archivoSrc = join(
  root,
  'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2',
);
const archivoInst = join(TMP, 'archivo-inst.ttf');

console.log('Archivo');
console.log(`  source            ${kb(archivoSrc)}`);
run('fonttools', [
  'varLib.instancer', archivoSrc, 'wdth=118', 'wght=400:700',
  '-o', archivoInst, '--no-overlap-flag',
]);
console.log(`  wdth pinned @118  ${kb(archivoInst)} (ttf)`);
run('fonttools', [
  'subset', archivoInst, `--unicodes=${UNICODES}`, '--flavor=woff2',
  `--layout-features=${LAYOUT}`,
  `--output-file=${join(OUT, 'archivo-expanded.woff2')}`,
]);
console.log(`  subset            ${kb(join(OUT, 'archivo-expanded.woff2'))} -> archivo-expanded.woff2`);

// --- IBM Plex Sans: subset each static weight ------------------------------
console.log('IBM Plex Sans');
for (const weight of [400, 500, 600]) {
  const src = join(
    root,
    `node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-${weight}-normal.woff2`,
  );
  const dest = join(OUT, `plex-${weight}.woff2`);
  run('fonttools', [
    'subset', src, `--unicodes=${UNICODES}`, '--flavor=woff2',
    `--layout-features=${LAYOUT}`, `--output-file=${dest}`,
  ]);
  console.log(`  ${weight}               ${kb(src)} -> ${kb(dest)}`);
}

console.log('\nDone. Fonts written to public/fonts/.');

#!/usr/bin/env node
/**
 * Renders the Open Graph / Twitter card image from the real logo artwork.
 *
 * Text is set in the same Archivo the site uses. The font is the instanced
 * copy produced by `npm run fonts:build`, registered with fontconfig so
 * librsvg can find it — so run that first, then:
 *
 *   cp node_modules/.font-build/archivo-inst.ttf ~/.fonts/ && fc-cache -f
 *   npm run og:build
 *
 * If the font is not registered the text falls back to a system sans and the
 * card goes off-brand, so check the output before shipping it.
 */
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1200, H = 630;
const INK = '#0f0e0d', GOLD = '#c9a44c', SILVER = '#aba9a8';

const logo = await sharp(join(root, 'public/images/brand/logo-full.png'))
  .resize({ width: 800 })
  .toBuffer();
const meta = await sharp(logo).metadata();

// Two faint panes echoing the glass panel inside the mark.
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="p1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0.02"/>
    </linearGradient>
    <linearGradient id="p2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${SILVER}" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="${SILVER}" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect x="962" y="-70" width="150" height="790" fill="url(#p1)" stroke="${GOLD}" stroke-opacity="0.4"/>
  <rect x="1092" y="-70" width="150" height="790" fill="url(#p2)" stroke="${SILVER}" stroke-opacity="0.28"/>
  <rect x="86" y="452" width="104" height="2" fill="${GOLD}"/>
  <text x="86" y="524" font-family="Archivo SemiBold" font-size="36" fill="${GOLD}">(561) 547-0702</text>
  <text x="86" y="572" font-family="Archivo SemiBold" font-size="23" fill="${SILVER}">West Palm Beach · Palm Beach · Broward · Miami-Dade</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 4, background: INK } })
  .composite([
    { input: logo, left: 78, top: Math.round((H - meta.height) / 2) - 96 },
    { input: overlay, left: 0, top: 0 },
  ])
  .jpeg({ quality: 88 })
  .toFile(join(root, 'public/images/og-default.jpg'));

console.log('og-default.jpg written (1200x630)');

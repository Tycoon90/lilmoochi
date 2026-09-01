#!/usr/bin/env node
/**
 * Post-build QA over the rendered HTML — the acceptance criteria for this
 * rebuild, checked against real output rather than against source.
 *
 * Every failure here is something the previous site got wrong:
 *   - missing or over-long titles and meta descriptions
 *   - no keyword-bearing H1, or more than one H1
 *   - images with no alt text
 *   - absent or malformed structured data
 * Plus one Astro-specific trap: whitespace containing a newline is trimmed at
 * the boundary between text and an adjacent element or {expression}, which
 * silently glues words together ("installed inWest Palm Beach").
 *
 * Run after `astro build`:  node scripts/check-output.mjs
 * Exits non-zero if anything fails, so it can gate a deploy.
 */
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const pages = [];
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e === 'index.html' || e === '404.html') pages.push(p);
  }
})(DIST);

const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]*>/g, ' ');

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&[a-zA-Z]+;/g, '·');

/** Words that legitimately contain an internal capital or digit-letter join. */
const ALLOW = /^(McK|iPhone|JavaScript|PostalAddress|WordPress)/;

let failures = 0;
const fail = (page, msg) => {
  console.error(`  ✗ ${msg}`);
  failures++;
};

console.log(`Checking ${pages.length} rendered page(s)\n`);

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const url = '/' + relative(DIST, file).replace(/index\.html$/, '');
  console.log(url);

  const isNoindex = /name="robots" content="noindex/.test(html);

  // --- title -------------------------------------------------------------
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(url, 'no <title>');
  else if (decode(title).length > 60)
    fail(url, `title is ${decode(title).length} chars (max 60): "${title}"`);

  // --- meta description --------------------------------------------------
  const desc = html.match(/name="description" content="([^"]*)"/)?.[1];
  if (!desc) fail(url, 'no meta description');
  else if (decode(desc).length > 155)
    fail(url, `description is ${decode(desc).length} chars (max 155)`);

  // --- exactly one H1 ----------------------------------------------------
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) fail(url, `${h1s.length} <h1> elements (expected 1)`);

  // --- canonical ---------------------------------------------------------
  if (!/rel="canonical"/.test(html)) fail(url, 'no canonical link');

  // --- alt text ----------------------------------------------------------
  const noAlt = html.match(/<img(?![^>]*\salt=)[^>]*>/g) || [];
  if (noAlt.length) fail(url, `${noAlt.length} <img> without alt`);
  const emptyAlt = html.match(/<img[^>]*\salt=""[^>]*>/g) || [];
  if (emptyAlt.length) fail(url, `${emptyAlt.length} <img> with empty alt`);

  // --- structured data ---------------------------------------------------
  const ld = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  if (!ld) fail(url, 'no JSON-LD');
  else {
    try {
      const g = JSON.parse(ld);
      const types = g['@graph'].map((n) => n['@type']);
      if (!types.includes('HomeAndConstructionBusiness'))
        fail(url, 'JSON-LD missing HomeAndConstructionBusiness');
      if (/aggregateRating|"Review"/.test(ld))
        fail(url, 'review schema present — must stay unwired until verified');
    } catch (e) {
      fail(url, `JSON-LD does not parse: ${e.message}`);
    }
  }

  // --- business name consistency ----------------------------------------
  const text = decode(strip(html));
  for (const wrong of [
    'Showers Door Unlimited',
    'Shower Doors Unlimited Inc',
    'Shower Doors Unlimited Corp',
    'Serenity by New Shower Doors',
  ]) {
    if (text.includes(wrong)) fail(url, `wrong business-name variant: "${wrong}"`);
  }
  if (/showerdoorsunlimited\.com/.test(html))
    fail(url, 'references the parked showerdoorsunlimited.com domain');

  // --- glued words -------------------------------------------------------
  for (const tok of text.split(/[\s]+/)) {
    if (tok.length < 6 || ALLOW.test(tok)) continue;
    const word = tok.replace(/^[^\w]+|[^\w]+$/g, '');
    // lowercase immediately followed by uppercase, inside a single token
    if (/[a-z][A-Z]/.test(word) && !word.includes('.') && !word.includes('/'))
      fail(url, `possible missing space: "${tok}"`);
    // digit glued to a word of 4+ letters ("15years")
    if (/\d[a-z]{4,}/.test(word)) fail(url, `possible missing space: "${tok}"`);
    // letters glued to a 5-digit number — a state abbreviation run into a ZIP
    // ("FL33406"), which is what an interpolated address looks like when the
    // whitespace between the two expressions has been trimmed away.
    if (/[A-Za-z]{2}\d{5}\b/.test(word))
      fail(url, `possible missing space between state and ZIP: "${tok}"`);
  }

  // --- stray characters --------------------------------------------------
  // Catches anything outside the Latin/punctuation range that reached the
  // copy by accident (a mistyped character, a bad paste).
  const stray = text.match(
    /[^\u0000-\u024F\u2000-\u206F\u20A0-\u20CF\u2190-\u21FF\u2200-\u22FF\u2600-\u27BF\uFE0F]/g,
  );
  if (stray)
    fail(url, `stray non-Latin character(s) in copy: ${[...new Set(stray)].join(' ')}`);

  // --- stale year --------------------------------------------------------
  if (/©\s*20(1\d|2[0-4])\b/.test(text) || /·\s*20(1\d|2[0-4])\s+New Shower/.test(text))
    fail(url, 'stale copyright year in footer');

  if (isNoindex) console.log('  (noindex)');
}

console.log(
  failures === 0
    ? `\nAll checks passed across ${pages.length} page(s).`
    : `\n${failures} check(s) failed.`,
);
process.exit(failures === 0 ? 0 : 1);

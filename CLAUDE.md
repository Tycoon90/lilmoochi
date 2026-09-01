# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **New Shower Doors Unlimited**, a custom glass shower door
installer in West Palm Beach, Florida. Static Astro build, deployed to Netlify.

**The repository is named `lilmoochi` and that is misleading.** `main` holds an
unrelated Next.js site (a boxing brand). This branch replaced those files
wholesale with the Astro site. If you find yourself reading Next.js config or
React components, you are on the wrong branch.

## Commands

```bash
npm run dev              # dev server, http://localhost:4321
npm run build            # astro build + the output checks below
npm run preview          # serve the built site
npm run check            # astro check (types); currently clean, keep it that way
npm run check:output     # run the output checks against an existing dist/
```

Asset generation. These write into `public/` and only need re-running when the
source artwork, the fonts, or the OG card change:

```bash
npm run logo:build       # logo variants + favicons, from src/assets/brand/logo-master.png
npm run fonts:build      # subset webfonts; needs: pip install "fonttools[woff]"
npm run og:build         # OG card; needs the Archivo TTF visible to fontconfig:
                         #   cp node_modules/.font-build/archivo-inst.ttf ~/.fonts/ && fc-cache -f
                         # without it the card silently falls back to a system sans
npm run migrate:images   # pull remaining photos from the old WordPress site
```

There is no test suite. `scripts/check-output.mjs` is the automated check.

## The build gate

`npm run build` runs `astro build` **and then** `scripts/check-output.mjs`,
which parses the rendered HTML in `dist/` and **fails the build** on:

- title over 60 chars, meta description over 155
- missing/duplicate `<h1>`, missing canonical
- any `<img>` without alt, or with empty alt
- JSON-LD that is absent or does not parse
- **any `Review` or `AggregateRating` markup appearing anywhere**
- wrong variants of the business name, or the parked `showerdoorsunlimited.com` domain
- words run together, a state abbreviation glued to a ZIP, stray non-Latin characters, a stale copyright year

`build:only` skips the checks. It exists for debugging a build failure. **Do not
use it to get past a failing check** — every rule encodes a defect the previous
site actually shipped.

## Architecture

`src/data/business.ts` is the single source of truth. Name, address, phone,
hours, socials, service areas. Nothing about the business may be hardcoded in a
template; `src/lib/schema.ts` generates all JSON-LD from it, so page copy and
structured data cannot drift apart.

Layouts stack: `BaseLayout` (head, SEO, JSON-LD graph, analytics, header/footer/
call bar) → `ServiceLayout` (service page hero, breadcrumbs, `Service` +
`FAQPage` schema, FAQ rendering, closing CTA). A service page file therefore
contains only its own content. `ServiceLayout` already takes an optional `city`
prop so future location pages drop in unchanged.

`src/data/services.ts` drives the nav, the footer and the home page service
index. Adding an entry there surfaces it everywhere.

Images go through `src/components/Photo.astro` only. It emits AVIF + WebP with a
responsive srcset, takes dimensions from image metadata (which is what holds CLS
at zero), and renders a labelled placeholder when a file is absent so a missing
photo never breaks a build. `alt` is a required prop. Files live in
`src/assets/photos/`; dropping images into `public/` instead bypasses both the
optimisation and the EXIF stripping.

## Constraints that will bite you

**Business name.** `New Shower Doors Unlimited`, verbatim, everywhere. It
appears across the web in five variants and that suppresses local rankings. No
"Inc.", no "Corp.", no abbreviating. The build fails if a variant appears.

**The domain does not match the name.** `showersdoorunlimited.com` keeps its
legacy spelling because existing directory citations point at it. This is
deliberate — do not "fix" it.

**Gold cannot carry text on light backgrounds.** `--color-gold` (#c9a44c) is
2.17:1 on paper. It is for decorative hairlines and dark surfaces only. Use
`--color-bronze` (#7a5c1e) for links, buttons, icons and focus rings on light,
and gold on dark. Both clear AA; the palette rationale and every measured pair
is documented at the top of `src/styles/global.css`.

**Astro trims whitespace containing a newline** at the boundary between text and
an adjacent element or `{expression}`. Writing `installed in\n{business.city}`
renders "installed inWest Palm Beach". Use `{' '}` or keep the expression on the
same line. This bug shipped four times during the build; `check-output.mjs` now
catches the common shapes, but it cannot catch all of them.

**Never invent** reviews, testimonials, customer names, project counts, awards,
certifications, licence numbers or prices. Where a real value is needed and
unknown, use `<TodoNote>` — it renders a deliberately off-brand dashed red block
and is listed in the README. Six price placeholders are live on the site by
design.

**Review schema is built but deliberately unwired** (`src/lib/reviews.ts`).
Marking up unverifiable reviews risks a Google manual action. The build fails if
any is emitted. Enabling it is a documented four-step change in the README.

**Do not reuse a photo across product categories.** Every supplied photograph
shows a frameless enclosure, so none appear on the sliding, framed or custom
mirror pages — a frameless photo beside copy selling a framed door
misrepresents the product. Those pages show placeholders until real photos of
that work exist. `src/data/photos.ts` records which alt text has actually been
checked against its image (`altVerified`).

**City pages are structured for but deliberately not built.** Thin location
pages that swap a place name into the same copy hurt more than they help. Build
them when there is genuinely city-specific content.

## Deploying

Netlify is the target: `netlify.toml` holds the build config, `public/_redirects`
holds the 301s from the old WordPress URLs (see `MIGRATION.md` — that map is
incomplete and the README says how to close it).

The repo is also linked to the Vercel project **`lilmoochi`**, which serves
`www.lilmoochi.com` — the unrelated boxing site — from `main`. Pushing this
branch produces a *preview* deployment only. **Never push this branch to
`main`**: that would deploy the shower doors site over a live production domain.

`_redirects` is Netlify-specific and does nothing on the Vercel preview.

## Before doing anything else

Read `README.md`. It carries the full `TODO: confirm with client` list — the
conflicting phone number, the Friday hours discrepancy, whether the street
address should be public at all, the six unpriced pages — plus the recommended
follow-up work.

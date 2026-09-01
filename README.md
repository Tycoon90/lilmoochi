# New Shower Doors Unlimited

Marketing site for **New Shower Doors Unlimited**, a family-owned custom glass
shower door and enclosure installer in West Palm Beach, Florida.

Static [Astro](https://astro.build) build. No CMS, no database, no server
runtime, no plugins. The previous site was WordPress and failed partly because
it needed security maintenance that nobody performed; there is nothing here
that can go unpatched.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build **and** the output checks below. Fails on any violation. |
| `npm run build:only` | Build without the checks — for debugging only |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Astro/TypeScript diagnostics |
| `npm run check:output` | Run the output checks against an existing `dist/` |
| `npm run migrate:images` | Download the photographs from the old site (see below) |
| `npm run fonts:build` | Regenerate the subset webfonts (needs `pip install "fonttools[woff]"`) |
| `npm run logo:build` | Regenerate the logo variants from the master artwork |
| `npm run og:build` | Regenerate the Open Graph card |

### The output checks are the point

`scripts/check-output.mjs` runs as part of `npm run build` and **fails the
build** on anything the old site got wrong:

- a title over 60 characters, or a meta description over 155
- a page with no `<h1>`, or more than one
- an `<img>` with missing or empty `alt`
- missing or unparseable JSON-LD, or JSON-LD missing the business entity
- `Review` / `AggregateRating` schema appearing anywhere (see *Reviews* below)
- any wrong variant of the business name, or a reference to the parked
  `showerdoorsunlimited.com` domain
- words accidentally run together, a stale copyright year, stray characters

If a deploy fails, read the output — it names the page and the problem. Do not
work around it by using `build:only`.

---

## Deployment (Netlify)

Connected to Netlify; `netlify.toml` holds the build config.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 22

Pushing to the default branch deploys. `public/_redirects` carries the 301s
from the old WordPress URLs — see [MIGRATION.md](MIGRATION.md).

### Environment variables

Set these in **Netlify → Site configuration → Environment variables**. Both are
optional; without them the site builds and runs, simply emitting no analytics.
No measurement ID is hardcoded anywhere in source. See `.env.example`.

| Variable | Purpose |
|---|---|
| `PUBLIC_GA4_ID` | GA4 measurement ID, e.g. `G-XXXXXXXXXX` |
| `PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag verification token (the `content` value only) |

### Event tracking

Every phone link and the estimate form carry a `data-track` attribute, and the
GA4 snippet forwards them automatically. No per-link wiring is needed — adding
`data-track="some_event"` to a new element is enough.

Existing events: `phone_click_header`, `phone_click_hero`, `phone_click_sticky`,
`phone_click_footer`, `phone_click_contact`, `phone_click_about`,
`phone_click_404`, `phone_click_thankyou`, `phone_click_service_hero`,
`phone_click_cta_band`, `form_open_hero`, `form_open_service_hero`,
`form_submit_estimate`.

**Set `/thank-you/` as a conversion in GA4.** That page exists so form
submissions have a URL to convert on — an inline success message cannot be used
as a conversion destination, which is why the old site's form was untrackable.

### The estimate form

Handled by **Netlify Forms** — no PHP mailer, no serverless function, no API key.
The form is detected from the built HTML at deploy time under the name
`estimate-request`.

**After the first deploy:**

1. **Netlify → Forms → `estimate-request` → Settings → Form notifications.**
   Add an email notification to the owner. *Until this is done, submissions are
   captured but nobody is told about them.*
2. **Send a real test submission** and confirm the email arrives and is not
   filtered as spam. The old site's form delivery was never verified, and that
   is the single most expensive thing that can silently break.
3. Spam filtering is on by default. The form also carries an off-screen
   honeypot field and a page-load timestamp, so an instantly-completed
   submission can be identified. There is no CAPTCHA, deliberately — a CAPTCHA
   costs more genuine enquiries than it stops bots.

**SMS notification — documented integration point, not yet wired.** The brief
asks for both email and SMS to the owner; email is wired above. For SMS, the
lightest option is a Netlify **outgoing webhook** (Forms → Settings → *Form
submission notifications* → *Outgoing webhook*) pointed at a Netlify Function
that calls Twilio or a similar gateway. That needs a Twilio account, a sending
number, and `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM` as
environment variables. It is not built, because it needs an account and a
number that only the client can open.

Note that **rate limiting is not fully solved by the honeypot.** Netlify's
built-in spam filtering plus the honeypot and time trap handle ordinary bot
traffic. True per-IP rate limiting would require routing submissions through a
Netlify Function. That is worth adding only if abuse actually materialises;
adding it up front is a maintenance burden for a problem this site may never
have.

---

## Brand

### Colour

The palette is taken from the logo, not invented. The values were sampled out
of the artwork: gold `#95763b`–`#ffe29c`, silver `#aba9a8`, ground `#0a0909`.

One thing needed solving. The logo's gold cannot carry text on a light
background — `#c9a44c` on paper measures 2.17:1, which fails AA badly. So the
same metal is used at two depths:

| Token | Value | Where | Contrast |
|---|---|---|---|
| `--color-gold` | `#c9a44c` | Dark surfaces: header, footer, CTA bands, call bar | 8.17:1 on ink |
| `--color-bronze` | `#7a5c1e` | Light surfaces: links, buttons, focus rings, icons | 5.71:1 on paper; white on it 6.22:1 |
| `--color-ink` | `#0f0e0d` | Dark grounds and body text | 17.72:1 on paper |
| `--color-paper` | `#f7f5f2` | Page background | — |
| `--color-slate` | `#57534b` | Muted body text | 7.03:1 on paper |
| `--color-silver` | `#aba9a8` | Muted text on dark, hairlines | 8.24:1 on ink |

**Gold is never used for text or icons on a light background.** At 2.17:1 it is
legal only for decorative hairlines. If you need a gold-looking accent on
paper, use bronze — it reads as the same metal and clears AA.

The header and footer are dark because the logo requires it: the mark sets
"NEW SHOWER DOORS" in silver, which is invisible on a light ground. The page
body between them stays light and photography-led.

### The logo files

The master artwork lives at `src/assets/brand/logo-master.png`.
`npm run logo:build` derives three variants into `public/images/brand/`, each
as AVIF, WebP and PNG:

| Variant | Contents | Used by |
|---|---|---|
| `logo-lockup` | Mark + wordmark, **tagline dropped** | Header, footer |
| `logo-full` | The complete lockup including the tagline | Open Graph card, `logo` in schema |
| `logo-mark` | The NSD monogram alone | Favicons, touch icon |

Two things were done to the artwork, and both should be reviewed:

1. **A compact lockup was composited.** At any width a site header can give it,
   the full lockup renders the tagline about four pixels tall — noise rather
   than words. The compact variant pairs the mark with the two main text lines.
   This is ordinary primary/secondary lockup practice, but it is a derived
   asset, not something the client supplied.
2. **The near-black ground was keyed to transparency**, so the mark sits on any
   dark surface without showing a box. The artwork has no alpha channel.

Because the tagline is dropped from the header and footer lockup, **"Premium
glass. Elevated living." is rendered as real text** in the footer, from
`brandTagline` in `business.ts`. Text inside an image is not readable by search
engines or screen readers.

If official artwork arrives as separate lockups, use those files directly and
retire `scripts/build-logo.mjs`.

## How the site is put together

```
src/
  data/
    business.ts     Single source of truth — name, address, phone, hours, socials
    services.ts     Every service sold, and which page each lives on
    photos.ts       Photo slots: filename, alt text, and the legacy file for each
    nav.ts          Navigation, derived from services.ts
  lib/
    schema.ts       JSON-LD builders, all generated from business.ts
    reviews.ts      Review schema — built, deliberately unwired
  layouts/
    BaseLayout.astro     Head, SEO, JSON-LD, analytics, header/footer/call bar
    ServiceLayout.astro  The shared shape of every service page
  components/     Header, Footer, CallBar, Photo, Faq, SpecTable, CtaBand,
                  TodoNote, Reviews
  pages/          One file per route
```

**Nothing about the business is hardcoded in a template.** Change the phone
number in `src/data/business.ts` and it updates in the header, the footer, the
sticky call bar, every call-to-action and the structured data at once.

### The business name

`New Shower Doors Unlimited`, verbatim, everywhere. The name currently appears
across the web in five variants, and that inconsistency suppresses local search
rankings. Do not add "Inc." or "Corp.", do not abbreviate, do not pluralize
differently. The output checks fail the build if a wrong variant appears.

**The domain keeps its legacy spelling** (`showersdoorunlimited.com`) while the
displayed name does not. That mismatch is intentional: existing directory
citations point at the domain, and changing it would cost more than it gains.

### Adding a service page

Copy an existing one. `ServiceLayout` handles the hero, breadcrumbs, JSON-LD
(`Service` + `FAQPage` + `BreadcrumbList`), FAQ rendering and the closing CTA;
the page file contains only its own content. Add the entry to
`src/data/services.ts` and it appears in the nav, the footer and the home page
index automatically.

### City pages — structured for, deliberately not built

`ServiceLayout` takes an optional `city` prop so `/shower-doors-wellington/`
and similar drop in without refactoring. **They have not been created.** Thin
location pages that repeat the same copy with a place name swapped hurt more
than they help. Build them when there is genuinely city-specific content —
a real job in that city, photographs from it, something true about working
there. Not before.

---

## Images

### ⚠️ The photographs have not been migrated

`npm run migrate:images` downloads the eleven photographs and the logo from the
old site into `src/assets/photos/`, named for the slot each fills. **It could
not run in the environment this site was built in** — requests to
`showersdoorunlimited.com` are refused by the network policy there. The script
is written and tested; it needs a machine with ordinary internet access.

```bash
npm run migrate:images
npm run build
```

Until then, every photo slot renders a **clearly labelled placeholder** rather
than a broken image, and the site builds and deploys cleanly.

If the old site is gone by the time you read this, source the photographs from
the client's phone or the Instagram account and drop them into
`src/assets/photos/` using the filenames listed in `src/data/photos.ts`.

### ⚠️ Alt text needs one verification pass

The alt text in `src/data/photos.ts` describes the subject each slot is *meant*
to hold. **Nobody has compared it against the actual photographs**, because they
could not be downloaded. Every entry is marked `altVerified: false`.

Once the images are in, open each one and confirm:

1. the photograph actually shows what the alt text says, and
2. any specific detail in it (hardware finish, room, glass type) is true.

Then set `altVerified: true`. Alt text describing something the photograph does
not show is worse than no alt text.

### How images are served

Drop a file in `src/assets/photos/` and use `<Photo src="file.jpg" alt="…" />`.
Astro emits AVIF with a WebP fallback, a responsive `srcset` at 480/800/1200/1800,
explicit width and height so nothing shifts during load, and `loading="lazy"`
below the fold. Pass `priority` for the one above-the-fold image on a page —
it becomes eager with `fetchpriority="high"`.

`alt` is a required prop. A photo cannot be added without it.

---

## Performance

Measured with Lighthouse (mobile preset — simulated 4G, 4× CPU throttle) against
`npm run preview`:

| | |
|---|---|
| Performance | **100** |
| Accessibility | **100** |
| Best practices | **100** |
| SEO | **100** |
| LCP | **1.5s** (budget: under 2.0s) |
| CLS | **0** |
| Total blocking time | **0ms** |
| Page weight | ~124KB over 7 requests |

**No JavaScript files are emitted at all.** The mobile nav, the gallery
lightbox and the form timestamp are the only scripts, and they inline into the
HTML. The desktop services menu uses `:focus-within` and needs no script.

Fonts are self-hosted with `font-display: swap` and preloaded, so nothing
blocks render. Archivo ships with a 62%–125% width axis, but this design uses
exactly one width; instancing that axis away and subsetting takes it from 88KB
to 26KB with byte-identical rendering. `npm run fonts:build` regenerates them.

Regenerating the Open Graph card needs that same font visible to fontconfig,
because the card's text is rendered by librsvg rather than a browser:

```bash
npm run fonts:build
cp node_modules/.font-build/archivo-inst.ttf ~/.fonts/ && fc-cache -f
npm run og:build
```

Without that step the card silently falls back to a system sans, so look at
`public/images/og-default.jpg` before shipping it.

**Re-measure after the images land.** LCP is currently a text element. Once the
hero photographs are in, the hero image becomes the LCP element. There is about
0.5s of headroom against the 2.0s budget; if it is exceeded, add a
`<link rel="preload" as="image">` for the hero image on the home and frameless
pages, which is the standard fix and was left out only because there is no
image to preload yet.

To re-measure:

```bash
npm run build && npm run preview
npx lighthouse http://localhost:4321/ --view
```

---

## TODO: confirm with client

**Everything in this list must be resolved or removed before launch.** Nothing
in it has been invented or guessed — where a real value was needed and unknown,
the site shows a visible placeholder instead.

### Business details (`src/data/business.ts`)

| Item | Detail |
|---|---|
| **Phone number** | The site uses `(561) 547-0702`. **Yelp lists a conflicting `(561) 574-7642`.** Confirm which is correct, then make sure every directory listing matches. A wrong number on a live site loses every lead that dials it. |
| **Hours** | The site says Monday–Friday, 8:00am–5:00pm, from the old site. **Yelp shows Friday closed.** Confirm. If Friday is closed, update both `business.hours` and `openingHours` — they must change together. |
| **Address** | `3133 Egremont Dr` is published on the site and in the structured data. Confirm it should be **publicly displayed** rather than service-area-only. Some installers prefer not to publish a residential base. If it should be hidden, remove the address and `geo` from `business.ts`, the footer and the contact page, and switch the schema to `areaServed` only. |
| **Geo coordinates** | Approximate, and must match whatever address is finally published. Remove alongside the address if it is hidden. |
| **Email** | The site uses `Albertoc8604@gmail.com`. **A Gmail address undercuts a $5,000 sale.** Recommend `alberto@showersdoorunlimited.com` on the existing domain — no new domain, minimal setup. Note also that the old contact page listed `Andreak@showerdoorsunlimited.com`, on a **different domain that now resolves to a parked page**. That address is deliberately not carried over, and the output checks fail the build if it reappears. |

### Prices — six visible placeholders on the live site

Each of these renders as a highlighted **TODO: confirm with client** block on
the page. They are impossible to miss, which is deliberate. **No price has been
invented anywhere on this site.**

| Page | What is needed |
|---|---|
| `/frameless-shower-doors/` | Installed range for a typical 3/8" door and panel, and for a larger corner enclosure |
| `/sliding-shower-doors/` | Installed range for a framed bypass door and for a barn-door style slider |
| `/framed-shower-doors-tub-enclosures/` | Installed range for a framed tub enclosure and a framed shower door |
| `/custom-mirrors/` | Per square foot or a typical installed vanity mirror, and whether old-mirror removal is charged separately |
| `/shower-door-repair/` | Service-call fee, a typical parts-and-labour range, and whether the call fee is credited if the work proceeds |
| `/commercial-new-construction/` | Whether to publish a minimum project size, whether builder pricing differs, and any licence or insurance detail to state for commercial clients |

A range with an explanation of what drives it converts better than "call for a
quote". It is worth twenty minutes of the client's time.

### Reviews — built, deliberately not wired

The old site claimed **"+289 Happy Clients"** and **"5 Star Reviews"** with
nothing behind either. Neither is carried over, and no `Review` or
`AggregateRating` schema is emitted anywhere — the output checks fail the build
if any appears.

Marking up reviews that cannot be verified is a Google **manual-action risk**,
and a manual action is far more expensive than the stars are worth.

To enable, once the client supplies **real reviews with the reviewer's
permission** (name, date, rating, text — ideally exported from Google Business
Profile):

1. Populate `reviews` in `src/lib/reviews.ts`.
2. Add `<Reviews />` to the home page.
3. Add `...reviewSchema(reviews, BUSINESS_ID)` to the home page's schema graph.
4. Remove the review-schema assertion from `scripts/check-output.mjs`.

`Reviews.astro` renders nothing while the list is empty, so the live site never
shows an empty testimonial rail. There is no placeholder text standing in for a
customer's words.

### Content and assets

| Item | Detail |
|---|---|
| **Official logo artwork** | The real logo is in use across the site. What is missing is a proper master: the supplied file is a single opaque 1717x916 PNG. Ask for an **SVG or transparent PNG**, plus a **stacked lockup** and a **mark-only** file. See *Brand* below — the variants currently in use are derived from that one PNG. |
| **Licence and insurance** | The site states the business is "fully licensed and insured" — the client's own wording from the old site. **No licence number is published**, because none was supplied. If the client wants one shown, get the number and verify it first. |
| **Old URL list** | The full old-site URL inventory could not be captured. See [MIGRATION.md](MIGRATION.md) — ten minutes in Search Console closes this. |

---

## Recommended next, in order of value

### 1. A half-day professional photo shoot — the highest-value thing left

**This is the largest remaining quality gap, and no amount of layout work fixes
it.** The migrated photographs are unretouched phone snapshots: mixed white
balance, available light, casual framing. This business sells glass — a product
chosen almost entirely on how it looks, at several thousand dollars a job —
against competitors using professional interior photography.

Three or four recent installs, shot properly in half a day, would do more for
conversion than any further work on this site. Specifically:

- Wide shots showing the enclosure in the whole bathroom, not just the door
- Detail shots of hardware and the polished glass edge — that is the craft
- Consistent white balance across the set, so the gallery reads as one body of work
- Shot in daylight where possible; South Florida bathrooms photograph well

The site is built to receive them: drop the files into `src/assets/photos/`
using the existing filenames, update the alt text, rebuild.

### 2. Verify form delivery, then watch it

Send a real submission and confirm the email arrives. Then check monthly. A
silently broken form is the most expensive failure a site like this can have,
and it is exactly what went unnoticed on the old one.

### 3. Google Business Profile

Make sure the profile uses **New Shower Doors Unlimited** verbatim, with the
confirmed phone number and hours, and that it links to
`https://showersdoorunlimited.com/`. For a local installer, the profile drives
more calls than the website does. Fixing the five name variants across
directories is the highest-leverage SEO work remaining after this rebuild.

### 4. Ask satisfied customers for reviews

The reviews exist on third-party sites but cannot be used on the site itself
without permission. A short post-installation message asking for a Google
review — with the direct link — compounds over time, and unlocks the review
schema above.

### 5. City pages, when there is something real to say

`/shower-doors-wellington/`, `/shower-doors-boynton-beach/` and similar. Build
them when there is genuine city-specific content behind each one. See above.

### 6. A CMS, only if the client starts editing

Not needed for v1 — content updates are handled by the agency, and a static
build is what removes the maintenance burden that killed the old site. If the
client ever wants to edit copy directly, the lightest option that does not
reintroduce that burden is a git-based CMS such as Sveltia or Decap, which
commits to this repository and changes nothing about how the site is built or
served. Do not move to WordPress.

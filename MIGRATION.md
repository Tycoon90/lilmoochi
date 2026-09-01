# URL migration — old site to new

The old site was WordPress + Elementor on `showersdoorunlimited.com`. The
domain does not change: existing directory citations point at it, and moving
would cost more than the misspelling does. Only the pages beneath it change.

Redirects are implemented in [`public/_redirects`](public/_redirects), which
Netlify reads from the published directory.

---

## ⚠️ This map is incomplete, and that is fixable in ten minutes

The old site **could not be crawled from the build environment** — requests to
`showersdoorunlimited.com` are refused by the network policy in place there, so
no page list, sitemap or link inventory could be captured.

What follows covers the URLs that are **documented in the brief** or that
follow **standard WordPress and Elementor conventions**. It is very likely
close, but it is not verified against the real site.

**Before launch, do this:**

1. Open Google Search Console for the property → **Indexing → Pages**, and
   export the full list of known URLs. Failing that, run a crawler
   (Screaming Frog's free tier covers 500 URLs) against the live old site
   while it is still up.
2. Compare that list against the table below.
3. Add any missing path to `public/_redirects`, pointing it at the closest
   equivalent page. Where there is no equivalent, let it 404 rather than
   redirecting it to the home page — a redirect to an irrelevant page is
   treated as a soft 404 and passes no value.
4. After launch, watch Search Console → **Pages → Not found (404)** for a
   month and add anything that shows up with real traffic.

---

## Page redirects

| Old URL | New URL | Status | Basis |
|---|---|---|---|
| `/homepage/` | `/` | 301 | Documented — the old site already redirected this |
| `/homepage` | `/` | 301 | Same, without trailing slash |
| `/home/` | `/` | 301 | Common WordPress slug |
| `/single-sliding-doors/` | `/sliding-shower-doors/` | 301 | One of the two service pages the old site published |
| `/double-sliding-doors/` | `/sliding-shower-doors/` | 301 | The other one |
| `/single-sliding-shower-doors/` | `/sliding-shower-doors/` | 301 | Slug variant |
| `/double-sliding-shower-doors/` | `/sliding-shower-doors/` | 301 | Slug variant |
| `/sliding-doors/` | `/sliding-shower-doors/` | 301 | Slug variant |
| `/shower-doors/` | `/` | 301 | Likely generic services page |
| `/services/` | `/` | 301 | Likely index of the two published services |
| `/about-us/` | `/about/` | 301 | Standard WordPress slug |
| `/contact-us/` | `/contact/` | 301 | Standard WordPress slug |
| `/our-work/` | `/gallery/` | 301 | Common gallery slug |
| `/portfolio/` | `/gallery/` | 301 | Common Elementor slug |
| `/projects/` | `/gallery/` | 301 | Common Elementor slug |

Both sliding-door pages consolidate onto one expanded page. Two thin pages
competing for the same term split their own ranking; one page covering single
and double bypass doors properly does not.

## WordPress endpoints — gone, deliberately

These return **410 Gone** rather than redirecting. A 410 tells search engines
the URL is permanently removed and stops them re-requesting it; a redirect to
the home page would be read as a soft 404.

| Old URL | Status |
|---|---|
| `/wp-json/*` | 410 |
| `/xmlrpc.php` | 410 |
| `/wp-login.php` | 410 |
| `/wp-admin/*` | 410 |
| `/wp-content/*` | 410 |
| `/feed/`, `/comments/feed/` | 301 → `/` |

`/wp-content/*` returning 410 matters: the photographs are re-encoded into the
Astro pipeline and served from hashed, cache-busted URLs, so the originals no
longer exist at their old paths. Any external site hotlinking those images will
break — which is correct, and was going to happen the moment WordPress was
switched off.

## New pages with no old equivalent

Nothing redirects to these. They are new, and will be discovered through the
sitemap and internal links.

| New URL | Note |
|---|---|
| `/frameless-shower-doors/` | The highest-value term in the market. The old site had no page for it at all. |
| `/framed-shower-doors-tub-enclosures/` | Sold, never published |
| `/custom-mirrors/` | Sold, never published |
| `/shower-door-repair/` | Sold, never published |
| `/commercial-new-construction/` | Sold, never published |
| `/thank-you/` | Form confirmation. `noindex`, and excluded from the sitemap. |

## After launch

- Submit `https://showersdoorunlimited.com/sitemap-index.xml` in Search Console.
- Use **Removals → Outdated content** only for URLs that must disappear fast.
  Redirects handle the rest without intervention.
- Expect ranking movement for two to four weeks. Consolidating two sliding-door
  pages into one, and adding pages for services that were never published,
  changes what the site is eligible to rank for.

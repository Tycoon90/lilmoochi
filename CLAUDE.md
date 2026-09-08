# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
NODE_OPTIONS=--openssl-legacy-provider npx vercel --prod # Deploy to production (www.lilmoochi.com)
```

```bash
npm run typecheck # tsc --noEmit
```

> **Note:** TypeScript and ESLint errors block the build. Keep `npm run lint` and `npm run typecheck` clean — do not re-add `ignoreBuildErrors` / `ignoreDuringBuilds` to `next.config.ts`.

## Video assets

`.MOV` files must be converted to `.mp4` before use in the browser. Use macOS `avconvert`:

```bash
avconvert --source input.mov --output output.mp4 --preset PresetHighestQuality --replace
```

Place all media (images, videos) in `public/images/`. Avoid spaces in filenames — rename with hyphens before referencing in code.

## Architecture

**Framework:** Next.js 15 App Router, React 19, Tailwind CSS v4, TypeScript.

**Pages:**
- `src/app/page.tsx` — Homepage. All major sections live here as one file (hero, about, coaches, watch & learn, merch CTA, Instagram section).
- `src/app/store/page.tsx` — Merch store page (server component; `StoreGrid` holds the category filter).
- `src/app/success/page.tsx` — Post-checkout confirmation; retrieves the Stripe session server-side.
- `src/app/api/checkout/route.ts` — Creates the Stripe Checkout Session.

**Shared components:**
- `src/components/Navbar.tsx` — Fixed top nav with mobile hamburger menu. Contains desktop and mobile nav in the same component with `useState` toggle.
- `src/components/Footer.tsx` — Site footer with nav links and social links.
- `src/components/MerchCard.tsx` — Single product card used in the store grid.
- `src/components/CartDrawer.tsx` — Slide-out cart; posts the cart to `/api/checkout`.

## Store catalog — read this before touching prices

`src/lib/products.ts` is the only place product data lives, with prices in cents.
The cart stores product ids, sizes and quantities only, and `/api/checkout`
re-reads every price from the catalog, so the client can never influence what is
charged. Never accept a price, name, or discount from the request body, and never
duplicate the product list in a page. Checkout also rejects unknown ids, sizes a
product doesn't offer, and quantities outside 1–`MAX_QUANTITY_PER_ITEM`.

## Mobile — checkout must stay reachable

Most traffic is a phone coming from Instagram. Two rules the store depends on:

- **The cart button exists in the mobile header, not only the desktop nav.**
  It was `hidden md:flex` at one point, with an empty spacer in its place on
  mobile: the drawer auto-opens after adding an item, and once closed there
  was no way to reopen it, so checkout was unreachable on a phone.
- **The cart drawer outranks the navbar** (`z-[60]` overlay, `z-[70]` panel,
  against the navbar's `z-50`). Both sat at `z-50` and the navbar renders
  later in the DOM, so it painted on top — the drawer's close button was
  covered by the hamburger and tapping it opened the nav menu instead.

Verify changes to either at an iPhone viewport, not just a narrow desktop
window: add to cart → close the drawer → reopen it from the header → reach the
checkout button.

## Brand colors

| Token | Hex | Usage |
|---|---|---|
| Primary blue | `#1e3a8a` | Backgrounds, buttons, dominant UI |
| Light blue | `#5b9bd5` | Text highlights, hover states, labels |
| Accent red | `#e8132a` | Small accent lines, label text only |
| Background | `#080808` | Page background |

## Custom cursor

Hovering buttons and links shows a blue boxing glove cursor defined in `src/app/globals.css` pointing to `public/images/glove-cursor.svg`.

## Deployment

Connected to Vercel under `dolla-s-projects/lilmoochi`. Running `npx vercel --prod` from the project root deploys directly to `www.lilmoochi.com`.

# Lil Moochi

Marketing site and merch store for Lil Moochi Boxing — [www.lilmoochi.com](https://www.lilmoochi.com).

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · Stripe Checkout.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (type errors and lint errors fail the build) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | Yes, for checkout | Server-side Stripe key. Without it `/api/checkout` returns 503 and the store is browse-only. |
| `NEXT_PUBLIC_SITE_URL` | No | Base URL for Stripe success/cancel redirects. Defaults to `https://www.lilmoochi.com`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 measurement id. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification token. |

## Store architecture

`src/lib/products.ts` is the single source of truth for the catalog. Prices live
there in cents.

- The store UI reads it for display.
- The cart persists **product ids, sizes and quantities only** — never prices.
- `/api/checkout` re-reads every price from the catalog before creating the
  Stripe session, and rejects unknown product ids, sizes that don't belong to
  the product, and quantities outside 1–10.

That means the browser can never influence what a customer is charged. Adding or
repricing a product is a one-line edit in `products.ts`.

Shipping is free at or above `FREE_SHIPPING_THRESHOLD_CENTS` ($75) and
`STANDARD_SHIPPING_CENTS` ($6.99) below it, decided server-side from the
catalog subtotal. Promotion codes are enabled on the Stripe session — a code
advertised on the site has to exist in the Stripe dashboard to work.

`/success` retrieves the Checkout Session from Stripe and renders the real
line items and total; it only confirms an order that Stripe reports as paid.

## Deploy

Vercel project `dolla-s-projects/lilmoochi`:

```bash
NODE_OPTIONS=--openssl-legacy-provider npx vercel --prod
```

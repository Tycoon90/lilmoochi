# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
NODE_OPTIONS=--openssl-legacy-provider npx vercel --prod # Deploy to production (www.lilmoochi.com)
```

> **Note:** `next.config.ts` has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` — TypeScript and ESLint errors will not block builds.

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
- `src/app/store/page.tsx` — Merch store page.

**Shared components:**
- `src/components/Navbar.tsx` — Fixed top nav with mobile hamburger menu. Contains desktop and mobile nav in the same component with `useState` toggle.
- `src/components/Footer.tsx` — Site footer with nav links and social links.
- `src/components/MerchCard.tsx` — Single product card used in the store grid.

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

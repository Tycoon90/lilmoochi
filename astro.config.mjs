// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical origin. The domain intentionally keeps the legacy spelling
// ("showersdoorunlimited") while the business name is "New Shower Doors
// Unlimited" — existing directory citations point at this domain, so the
// mismatch between domain and displayed name is deliberate.
export default defineConfig({
  site: 'https://showersdoorunlimited.com',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      // The confirmation page exists for conversion tracking, not for search.
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});

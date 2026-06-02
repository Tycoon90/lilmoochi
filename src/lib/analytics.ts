export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url });
}

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

export function event({ action, category, label, value, ...rest }: GTagEvent) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
}

// ── Typed helpers for every event we track ──────────────────────────────────

export const analytics = {
  /** Fired when a merch product card is visible in the viewport */
  viewItem(item: { name: string; price: string; category?: string }) {
    event({
      action: 'view_item',
      category: 'ecommerce',
      label: item.name,
      item_name: item.name,
      item_price: item.price,
      item_category: item.category ?? 'Merch',
    });
  },

  /** Fired when "Add to Cart" button is clicked */
  addToCart(item: { name: string; price: string }) {
    event({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: item.name,
      currency: 'USD',
      value: parseFloat(item.price.replace('$', '')),
      items: [{ item_name: item.name, price: item.price }],
    });
  },

  /** Fired when "Shop Now" / store CTA is clicked */
  beginCheckout() {
    event({ action: 'begin_checkout', category: 'ecommerce' });
  },

  /** Fired on outbound link clicks (Instagram, TikTok, YouTube) */
  outboundLink(url: string, label: string) {
    event({
      action: 'click',
      category: 'outbound',
      label,
      link_url: url,
      transport_type: 'beacon',
    });
  },

  /** Fired when a training card "Watch Now" is clicked */
  watchTraining(title: string) {
    event({
      action: 'watch_training',
      category: 'engagement',
      label: title,
    });
  },

  /** Fired when hero "See Training" CTA is clicked */
  ctaClick(label: string, destination: string) {
    event({
      action: 'cta_click',
      category: 'engagement',
      label,
      destination,
    });
  },
};

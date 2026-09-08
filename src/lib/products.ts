/**
 * Single source of truth for the merch catalog.
 *
 * Prices live here in cents and are ONLY ever read server-side when building a
 * Stripe checkout session — the browser never gets to tell us what something
 * costs. The store UI reads the same list so displayed prices can't drift from
 * charged prices.
 */

export type Category = 'Apparel' | 'Accessories' | 'Equipment';

export interface Product {
  id: string;
  name: string;
  priceCents: number;
  tag?: string;
  emoji: string;
  category: Category;
  sizes: string[];
  mockupImage?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'classic-tee',
    name: 'Lil Moochi Classic Tee',
    priceCents: 2999,
    tag: 'Bestseller',
    emoji: '👕',
    category: 'Apparel',
    sizes: ['YXS', 'YS', 'YM', 'YL', 'S', 'M', 'L', 'XL'],
    mockupImage: '/images/mockup-kids-tee.jpg',
  },
  {
    id: 'champion-hoodie',
    name: 'Champion Hoodie',
    priceCents: 5499,
    tag: 'New Drop',
    emoji: '🧥',
    category: 'Apparel',
    sizes: ['YS', 'YM', 'YL', 'S', 'M', 'L', 'XL'],
    mockupImage: '/images/mockup-kids-hoodie.jpg',
  },
  {
    id: 'youth-gloves',
    name: 'Boxing Gloves (Youth)',
    priceCents: 3999,
    tag: 'Signature',
    emoji: '🥊',
    category: 'Equipment',
    sizes: ['4oz', '6oz', '8oz'],
  },
  {
    id: 'snapback-cap',
    name: 'Snapback Cap',
    priceCents: 2499,
    emoji: '🧢',
    category: 'Accessories',
    sizes: ['One Size'],
    mockupImage: '/images/mockup-kids-cap.jpg',
  },
  {
    id: 'training-shorts',
    name: 'Training Shorts',
    priceCents: 3499,
    emoji: '🩳',
    category: 'Apparel',
    sizes: ['YXS', 'YS', 'YM', 'YL', 'S', 'M', 'L'],
    mockupImage: '/images/mockup-kids-shorts.jpg',
  },
  {
    id: 'adult-tee',
    name: 'Adult Tee',
    priceCents: 3499,
    tag: 'Adult',
    emoji: '👕',
    category: 'Apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    mockupImage: '/images/mockup-adult-tee.jpg',
  },
  {
    id: 'gym-bag',
    name: 'Gym Bag',
    priceCents: 4499,
    tag: 'Limited',
    emoji: '🎒',
    category: 'Accessories',
    sizes: ['One Size'],
  },
  {
    id: 'sticker-pack',
    name: 'Sticker Pack (5x)',
    priceCents: 999,
    emoji: '🏷️',
    category: 'Accessories',
    sizes: ['One Size'],
  },
];

export const CATEGORIES: Array<'All' | Category> = ['All', 'Apparel', 'Accessories', 'Equipment'];

/** Orders at or above this subtotal ship free. Advertised on the store page. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 7500;
export const STANDARD_SHIPPING_CENTS = 699;
/** Per-line cap so a fat-fingered (or hostile) quantity can't create a huge order. */
export const MAX_QUANTITY_PER_ITEM = 10;
/** Cap on distinct lines in one checkout. */
export const MAX_CART_LINES = 20;

const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

export function getProduct(id: string): Product | undefined {
  return BY_ID.get(id);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

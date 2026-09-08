import Stripe from 'stripe';

let cached: Stripe | null = null;

/**
 * Returns a Stripe client, or null when STRIPE_SECRET_KEY is not configured.
 * Never constructed at module scope so a missing key can't break the build.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) cached = new Stripe(key);
  return cached;
}

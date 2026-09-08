import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import {
  getProduct,
  FREE_SHIPPING_THRESHOLD_CENTS,
  STANDARD_SHIPPING_CENTS,
  MAX_QUANTITY_PER_ITEM,
  MAX_CART_LINES,
} from '@/lib/products';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lilmoochi.com';

interface RequestLine {
  id: string;
  size: string;
  quantity: number;
}

/**
 * The client sends product ids and quantities only. Every price is looked up in
 * the server-side catalog, so a tampered request can't change what's charged.
 */
function parseLines(body: unknown): RequestLine[] | null {
  if (!body || typeof body !== 'object') return null;
  const items = (body as { items?: unknown }).items;
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_CART_LINES) return null;

  const lines: RequestLine[] = [];
  for (const raw of items) {
    if (!raw || typeof raw !== 'object') return null;
    const { id, size, quantity } = raw as Record<string, unknown>;
    if (typeof id !== 'string' || typeof size !== 'string') return null;
    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) return null;
    if (quantity < 1 || quantity > MAX_QUANTITY_PER_ITEM) return null;

    const product = getProduct(id);
    if (!product || !product.sizes.includes(size)) return null;

    lines.push({ id, size, quantity });
  }
  return lines;
}

function shippingOptions(subtotalCents: number): Stripe.Checkout.SessionCreateParams.ShippingOption[] {
  if (subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) {
    return [{
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: 0, currency: 'usd' },
        display_name: 'Free Shipping',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 3 },
          maximum: { unit: 'business_day', value: 7 },
        },
      },
    }];
  }
  return [{
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: STANDARD_SHIPPING_CENTS, currency: 'usd' },
      display_name: 'Standard Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 3 },
        maximum: { unit: 'business_day', value: 7 },
      },
    },
  }];
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const lines = parseLines(body);
  if (!lines) {
    return NextResponse.json({ error: 'Your cart is invalid. Please refresh and try again.' }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    console.error('Checkout attempted without STRIPE_SECRET_KEY configured');
    return NextResponse.json({ error: 'Checkout is not available right now.' }, { status: 503 });
  }

  const lineItems = lines.map((line) => {
    const product = getProduct(line.id)!;
    const showSize = product.sizes.length > 1 || product.sizes[0] !== 'One Size';
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Lil Moochi — ${product.name}${showSize ? ` (${line.size})` : ''}`,
          description: 'Official Lil Moochi Boxing Merchandise',
          metadata: { product_id: product.id, size: line.size },
        },
        unit_amount: product.priceCents,
      },
      quantity: line.quantity,
    };
  });

  const subtotalCents = lines.reduce(
    (sum, line) => sum + getProduct(line.id)!.priceCents * line.quantity,
    0
  );

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/store`,
      // Lets advertised codes (e.g. MOOCHI10) actually be redeemed at checkout.
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'MX', 'PR'],
      },
      shipping_options: shippingOptions(subtotalCents),
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

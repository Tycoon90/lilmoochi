import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lilmoochi.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body;

    const lineItems = items.map((item: { name: string; price: string; size: string; quantity: number }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Lil Moochi — ${item.name}${item.size && item.size !== 'undefined' ? ` (${item.size})` : ''}`,
          description: 'Official Lil Moochi Boxing Merchandise',
        },
        unit_amount: Math.round(parseFloat(item.price.replace('$', '')) * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/store`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'MX', 'PR'],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

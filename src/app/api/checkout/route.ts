import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { name, price, quantity, size, image } = await req.json();

    // Convert price string like "$29.99" to cents
    const priceInCents = Math.round(parseFloat(price.replace('$', '')) * 100);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lilmoochi.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Lil Moochi — ${name}${size ? ` (${size})` : ''}`,
              description: 'Official Lil Moochi Boxing Merchandise',
              images: image ? [`${siteUrl}${image}`] : [],
            },
            unit_amount: priceInCents,
          },
          quantity: quantity || 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/store`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'MX', 'PR'],
      },
      metadata: {
        product: name,
        size: size || 'N/A',
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

import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClearCartOnMount from '@/components/ClearCartOnMount';
import { getStripe } from '@/lib/stripe';
import { formatPrice } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Thank you for your Lil Moochi order!',
  robots: { index: false, follow: false },
};

interface OrderSummary {
  email: string | null;
  totalCents: number;
  lines: Array<{ description: string; quantity: number; amountCents: number }>;
}

/** Reads the real order back from Stripe so the page can't claim a sale that never happened. */
async function loadOrder(sessionId: string | undefined): Promise<OrderSummary | null> {
  if (!sessionId) return null;
  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] });
    if (session.payment_status !== 'paid' && session.status !== 'complete') return null;
    return {
      email: session.customer_details?.email ?? null,
      totalCents: session.amount_total ?? 0,
      lines: (session.line_items?.data ?? []).map((li) => ({
        description: li.description ?? 'Item',
        quantity: li.quantity ?? 1,
        amountCents: li.amount_total ?? 0,
      })),
    };
  } catch (error) {
    console.error('Could not load checkout session:', error);
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const order = await loadOrder(sessionId);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      <Navbar />
      {sessionId && <ClearCartOnMount />}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md w-full">
          <div className="text-6xl mb-6" aria-hidden="true">🥊</div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#e8132a]" />
            <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Order Confirmed</span>
            <span className="w-10 h-0.5 bg-[#e8132a]" />
          </div>
          <h1 className="font-black uppercase text-4xl mb-4">
            Thank You!
          </h1>
          <p className="text-gray-400 leading-relaxed mb-2">
            Your order has been placed successfully.{' '}
            {order?.email
              ? `A confirmation email is on its way to ${order.email}.`
              : "You'll receive a confirmation email shortly."}
          </p>

          {order && order.lines.length > 0 && (
            <div className="text-left border border-white/10 divide-y divide-white/5 my-8">
              {order.lines.map((line, i) => (
                <div key={i} className="flex justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-gray-300">
                    {line.description}
                    {line.quantity > 1 && <span className="text-gray-600"> × {line.quantity}</span>}
                  </span>
                  <span className="text-sm font-black whitespace-nowrap">{formatPrice(line.amountCents)}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 px-4 py-3 bg-white/5">
                <span className="text-xs uppercase tracking-widest text-gray-400 self-center">Total Paid</span>
                <span className="font-black">{formatPrice(order.totalCents)}</span>
              </div>
            </div>
          )}

          <p className="text-[#5b9bd5] text-sm font-bold mb-8">
            Every purchase fuels a champion&apos;s journey. 🏆
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store"
              className="bg-[#1e3a8a] text-white font-black px-8 py-4 uppercase tracking-wide hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="border-2 border-white/20 text-white font-black px-8 py-4 uppercase tracking-wide hover:border-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

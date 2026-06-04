import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Thank you for your Lil Moochi order!',
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🥊</div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#e8132a]" />
            <span className="text-[#e8132a] text-xs font-bold uppercase tracking-[0.3em]">Order Confirmed</span>
            <span className="w-10 h-0.5 bg-[#e8132a]" />
          </div>
          <h1 className="font-black uppercase text-4xl mb-4">
            Thank You!
          </h1>
          <p className="text-gray-400 leading-relaxed mb-2">
            Your order has been placed successfully. You'll receive a confirmation email shortly.
          </p>
          <p className="text-[#5b9bd5] text-sm font-bold mb-8">
            Every purchase fuels a champion's journey. 🏆
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

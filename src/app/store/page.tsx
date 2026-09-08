import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreGrid from '@/components/StoreGrid';
import { formatPrice, FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Merch Store',
  description: 'Official Lil Moochi boxing merch — tees, hoodies, gloves, caps and more. Rep the future world champion.',
  alternates: { canonical: 'https://lilmoochi.com/store' },
  openGraph: {
    title: 'Lil Moochi Store — Official Merch',
    description: 'Rep the future world champion. Shop official Lil Moochi gear.',
    url: 'https://lilmoochi.com/store',
    images: [{ url: '/images/moochi-logo.png', width: 800, height: 800, alt: 'Lil Moochi Store' }],
  },
};

export default function StorePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* Header */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden border-b border-white/5">
        <div className="absolute right-0 top-0 h-full w-64 bg-[#1e3a8a]/10 skew-x-[-8deg] translate-x-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#1e3a8a]" />
            <span className="text-[#5b9bd5] text-xs font-bold uppercase tracking-[0.3em]">Official Merch</span>
          </div>
          <h1 className="font-black uppercase leading-none mb-4" style={{ fontSize: 'clamp(2rem, 10vw, 5rem)' }}>
            Moochi<br /><span className="text-[#5b9bd5]">Store</span>
          </h1>
          <p className="text-gray-400 max-w-md mb-2">
            Rep the future world champion. Every purchase supports Lil Moochi&apos;s journey to the top.
          </p>
          <p className="text-[#5b9bd5] text-sm font-bold">
            🚚 Free Shipping Over {formatPrice(FREE_SHIPPING_THRESHOLD_CENTS)} · Promo codes apply at checkout
          </p>
        </div>
      </section>

      <StoreGrid />

      {/* Promo Banner */}
      <section className="bg-[#1e3a8a] py-10 px-4 text-center">
        <p className="font-black text-lg uppercase tracking-widest mb-2">Every Purchase = Champion Fuel</p>
        <p className="text-blue-200 text-sm max-w-md mx-auto">100% of proceeds go directly toward Lil Moochi&apos;s training, travel, and championship journey.</p>
      </section>

      <Footer />
    </div>
  );
}

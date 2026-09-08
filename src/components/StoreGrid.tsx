'use client';
import { useState } from 'react';
import MerchCard from '@/components/MerchCard';
import { CATEGORIES, PRODUCTS } from '@/lib/products';

export default function StoreGrid() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All');
  const visible = active === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      {/* Filter bar */}
      <div className="border-b border-white/5 bg-[#0d0d0d] sticky top-[60px] z-40">
        <div className="max-w-6xl mx-auto overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-0 min-w-max px-4 md:min-w-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                aria-pressed={cat === active}
                className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-r border-white/5 transition-colors whitespace-nowrap min-h-[48px] ${
                  cat === active ? 'bg-[#1e3a8a] text-white' : 'text-gray-500 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900">
          {visible.map((p) => (
            <MerchCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

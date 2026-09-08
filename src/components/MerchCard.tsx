'use client';
import { useEffect, useRef, useState } from 'react';
import { analytics } from '@/lib/analytics';
import { useCart } from '@/lib/cart';
import { formatPrice, Product } from '@/lib/products';

export default function MerchCard({ product }: { product: Product }) {
  const { id, name, priceCents, tag, emoji, sizes, mockupImage } = product;
  const ref = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || '');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const price = formatPrice(priceCents);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          analytics.viewItem({ name, price });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [name, price]);

  const handleAddToCart = () => {
    analytics.addToCart({ name, price });
    addItem(id, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div ref={ref} className="group bg-[#0d0d0d] hover:bg-zinc-900 transition-colors duration-300 flex flex-col border border-transparent hover:border-white/5">

      {/* Product Image */}
      <div className="relative h-72 overflow-hidden bg-zinc-900">
        {tag && (
          <span className="absolute top-3 left-3 bg-[#1e3a8a] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 z-10">
            {tag}
          </span>
        )}

        {mockupImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={mockupImage}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-transparent.png" alt="" loading="lazy" className="w-24 h-24 object-contain drop-shadow-lg mb-2" />
            <span className="text-4xl mt-2" aria-hidden="true">{emoji}</span>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">LIL MOOCHI</p>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-sm uppercase leading-tight mb-3">{name}</h3>

        {sizes.length > 1 && (
          <div className="mb-4">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2" id={`size-label-${id}`}>Size</p>
            <div className="flex flex-wrap gap-1" role="group" aria-labelledby={`size-label-${id}`}>
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  aria-pressed={selectedSize === s}
                  className={`px-2 py-1 text-[10px] font-bold uppercase border transition-colors ${
                    selectedSize === s
                      ? 'border-[#5b9bd5] text-[#5b9bd5] bg-[#5b9bd5]/10'
                      : 'border-white/10 text-gray-500 hover:border-white/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-black">{price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
            className={`w-full py-3 font-black text-xs uppercase tracking-widest transition-all ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-[#e8132a] text-white hover:bg-red-700'
            }`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { analytics } from '@/lib/analytics';

interface MerchCardProps {
  name: string;
  price: string;
  tag?: string;
  emoji: string;
  category?: string;
  sizes?: string[];
  mockupImage?: string;
}

export default function MerchCard({ name, price, tag, emoji, sizes = [], mockupImage }: MerchCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || '');
  const [added, setAdded] = useState(false);

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
          <Image
            src={mockupImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Fallback logo mockup for products without photos */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
            <div className="relative w-24 h-24 mb-2">
              <Image
                src="/images/logo-transparent.png"
                alt="Moochi Logo"
                fill
                sizes="96px"
                className="object-contain drop-shadow-lg"
              />
            </div>
            <span className="text-4xl mt-2">{emoji}</span>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">LIL MOOCHI</p>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-sm uppercase leading-tight mb-3 flex-1">{name}</h3>

        {sizes.length > 1 && (
          <div className="mb-4">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Size</p>
            <div className="flex flex-wrap gap-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
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

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-black">{price}</span>
          <button
            className={`text-xs font-bold px-4 py-2.5 uppercase tracking-widest transition-all ${
              added ? 'bg-green-600 text-white' : 'bg-[#1e3a8a] text-white hover:bg-blue-700'
            }`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

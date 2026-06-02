'use client';
import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

interface MerchCardProps {
  name: string;
  price: string;
  tag?: string;
  emoji: string;
}

export default function MerchCard({ name, price, tag, emoji }: MerchCardProps) {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="group bg-[#0d0d0d] hover:bg-zinc-900 transition-colors duration-300 flex flex-col">
      <div className="bg-zinc-800 h-52 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-300 overflow-hidden">
        <span>{emoji}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        {tag && (
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5b9bd5] mb-2">{tag}</span>
        )}
        <h3 className="font-black text-base uppercase leading-tight mb-4 flex-1">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black">{price}</span>
          <button
            className="bg-[#1e3a8a] text-white text-xs font-bold px-4 py-2.5 uppercase tracking-widest hover:bg-blue-700 transition-colors"
            onClick={() => analytics.addToCart({ name, price })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

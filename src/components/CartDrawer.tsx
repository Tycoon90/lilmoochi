'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatPrice, FREE_SHIPPING_THRESHOLD_CENTS } from '@/lib/products';

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPriceCents, isOpen, setIsOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD_CENTS - totalPriceCents;

  // Escape closes the drawer, and the page behind it shouldn't scroll while it's open.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, setIsOpen]);

  const handleCheckout = async () => {
    if (items.length === 0 || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.productId, size: i.size, quantity: i.quantity })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || 'Checkout failed. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0d0d0d] border-l border-white/10 z-[70] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="font-black text-lg uppercase">Your Cart</h2>
            <p className="text-[#5b9bd5] text-xs font-bold">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart" className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3" aria-hidden="true">🛒</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="flex gap-4 bg-zinc-900 p-4">
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0 bg-zinc-800 overflow-hidden">
                  {item.product.mockupImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.product.mockupImage} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl" aria-hidden="true">{item.product.emoji}</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm uppercase leading-tight mb-1">{item.product.name}</p>
                  {item.size && item.size !== 'One Size' && (
                    <p className="text-[#5b9bd5] text-xs font-bold uppercase mb-2">Size: {item.size}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-white/10">
                      <button onClick={() => updateQty(item.key, item.quantity - 1)} aria-label={`Decrease quantity of ${item.product.name}`} className="px-2 py-1 text-gray-400 hover:text-white">−</button>
                      <span className="px-3 py-1 text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.key, item.quantity + 1)} aria-label={`Increase quantity of ${item.product.name}`} className="px-2 py-1 text-gray-400 hover:text-white">+</button>
                    </div>
                    <button onClick={() => removeItem(item.key)} className="text-xs text-gray-600 hover:text-red-400 uppercase tracking-widest">Remove</button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-sm">{formatPrice(item.lineTotalCents)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 uppercase text-xs tracking-widest">Subtotal</span>
              <span className="font-black text-xl">{formatPrice(totalPriceCents)}</span>
            </div>
            <p className="text-gray-600 text-xs">
              {remainingForFreeShipping > 0
                ? `Add ${formatPrice(remainingForFreeShipping)} more for free shipping`
                : 'Free shipping unlocked 🎉'}
            </p>
            {error && <p className="text-[#e8132a] text-xs font-bold">{error}</p>}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-4 font-black text-sm uppercase tracking-widest transition-all ${loading ? 'bg-zinc-700 text-gray-400' : 'bg-[#e8132a] text-white hover:bg-red-700'}`}
            >
              {loading ? 'Redirecting to Stripe...' : `Checkout — ${formatPrice(totalPriceCents)}`}
            </button>
            <button onClick={clearCart} className="w-full text-xs text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

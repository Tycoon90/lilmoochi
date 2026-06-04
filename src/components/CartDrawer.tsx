'use client';
import { useCart } from '@/lib/cart';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed. Please try again.');
        setLoading(false);
      }
    } catch {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0d0d0d] border-l border-white/10 z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="font-black text-lg uppercase">Your Cart</h2>
            <p className="text-[#5b9bd5] text-xs font-bold">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest">Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-zinc-900 p-4">
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0 bg-zinc-800 overflow-hidden">
                  {item.mockupImage ? (
                    <img src={item.mockupImage} alt={item.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">{item.emoji}</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm uppercase leading-tight mb-1">{item.name}</p>
                  {item.size !== 'undefined' && item.size && (
                    <p className="text-[#5b9bd5] text-xs font-bold uppercase mb-2">Size: {item.size}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-white/10">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-400 hover:text-white">−</button>
                      <span className="px-3 py-1 text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-400 hover:text-white">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-gray-600 hover:text-red-400 uppercase tracking-widest">Remove</button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-sm">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
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
              <span className="font-black text-xl">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-gray-600 text-xs">Shipping calculated at checkout</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-4 font-black text-sm uppercase tracking-widest transition-all ${loading ? 'bg-zinc-700 text-gray-400' : 'bg-[#e8132a] text-white hover:bg-red-700'}`}
            >
              {loading ? 'Redirecting to Stripe...' : `Checkout — $${totalPrice.toFixed(2)}`}
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

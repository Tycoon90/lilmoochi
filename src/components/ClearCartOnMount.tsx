'use client';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart';

/** Empties the cart once the order is confirmed, so returning shoppers start clean. */
export default function ClearCartOnMount() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // Run once on mount — clearCart is stable enough for this one-shot effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

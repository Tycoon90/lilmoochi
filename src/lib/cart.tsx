'use client';
import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { getProduct, MAX_QUANTITY_PER_ITEM, MAX_CART_LINES, Product } from './products';

const STORAGE_KEY = 'moochi-cart';

/** What we persist: ids and quantities only — prices always come from the catalog. */
interface CartLine {
  productId: string;
  size: string;
  quantity: number;
}

/** What components render: the line joined to its catalog product. */
export interface CartEntry extends CartLine {
  key: string;
  product: Product;
  lineTotalCents: number;
}

interface CartContextType {
  items: CartEntry[];
  addItem: (productId: string, size: string) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPriceCents: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

const lineKey = (productId: string, size: string) => `${productId}::${size}`;

/** localStorage is user-writable and can hold carts from an older catalog. */
function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l): l is CartLine =>
        !!l &&
        typeof l === 'object' &&
        typeof (l as CartLine).productId === 'string' &&
        typeof (l as CartLine).size === 'string' &&
        Number.isFinite((l as CartLine).quantity)
      )
      .filter((l) => {
        const product = getProduct(l.productId);
        return !!product && product.sizes.includes(l.size);
      })
      .map((l) => ({
        ...l,
        quantity: Math.min(Math.max(Math.round(l.quantity), 1), MAX_QUANTITY_PER_ITEM),
      }))
      .slice(0, MAX_CART_LINES);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      setLines(parseStoredCart(localStorage.getItem(STORAGE_KEY)));
    } catch {
      // Private mode / storage disabled — cart just stays in memory.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    // Don't write before the first read, or we'd wipe a saved cart.
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Ignore quota / disabled storage.
    }
  }, [lines, hydrated]);

  const addItem = (productId: string, size: string) => {
    const product = getProduct(productId);
    if (!product || !product.sizes.includes(size)) return;
    setLines((prev) => {
      const existing = prev.find((l) => lineKey(l.productId, l.size) === lineKey(productId, size));
      if (existing) {
        return prev.map((l) =>
          lineKey(l.productId, l.size) === lineKey(productId, size)
            ? { ...l, quantity: Math.min(l.quantity + 1, MAX_QUANTITY_PER_ITEM) }
            : l
        );
      }
      if (prev.length >= MAX_CART_LINES) return prev;
      return [...prev, { productId, size, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (key: string) =>
    setLines((prev) => prev.filter((l) => lineKey(l.productId, l.size) !== key));

  const updateQty = (key: string, qty: number) => {
    if (qty <= 0) return removeItem(key);
    setLines((prev) =>
      prev.map((l) =>
        lineKey(l.productId, l.size) === key
          ? { ...l, quantity: Math.min(qty, MAX_QUANTITY_PER_ITEM) }
          : l
      )
    );
  };

  const clearCart = () => setLines([]);

  const items = useMemo<CartEntry[]>(
    () =>
      lines.flatMap((l) => {
        const product = getProduct(l.productId);
        if (!product) return [];
        return [{
          ...l,
          key: lineKey(l.productId, l.size),
          product,
          lineTotalCents: product.priceCents * l.quantity,
        }];
      }),
    [lines]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPriceCents = items.reduce((sum, i) => sum + i.lineTotalCents, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPriceCents, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

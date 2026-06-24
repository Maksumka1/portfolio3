import { useState, useCallback } from 'react';

// Simple global cart state
let cartItems = [];
let listeners = new Set();

function notify() {
  listeners.forEach(fn => fn([...cartItems]));
}

export function useCart() {
  const [items, setItems] = useState(cartItems);

  useState(() => {
    const listener = (newItems) => setItems(newItems);
    listeners.add(listener);
    return () => listeners.delete(listener);
  });

  const addItem = useCallback((product, qty = 1) => {
    const existing = cartItems.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cartItems.push({ ...product, qty });
    }
    cartItems = [...cartItems];
    notify();
  }, []);

  const removeItem = useCallback((productId) => {
    cartItems = cartItems.filter(i => i.id !== productId);
    notify();
  }, []);

  const updateQty = useCallback((productId, qty) => {
    const item = cartItems.find(i => i.id === productId);
    if (item) {
      if (qty <= 0) {
        cartItems = cartItems.filter(i => i.id !== productId);
      } else {
        item.qty = qty;
        cartItems = [...cartItems];
      }
      notify();
    }
  }, []);

  const clearCart = useCallback(() => {
    cartItems = [];
    notify();
  }, []);

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return { items, addItem, removeItem, updateQty, clearCart, totalPrice, totalItems };
}
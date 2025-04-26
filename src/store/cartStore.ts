'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShopifyProduct } from '../../app/context/ShopifyContext';

export interface CartItem {
  product: ShopifyProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: ShopifyProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = parseFloat(item.product.variants[0]?.price?.amount || '0');
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
); 
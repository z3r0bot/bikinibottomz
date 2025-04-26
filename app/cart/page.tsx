'use client';

import { useCartStore, CartItem } from '@/store/cartStore';
import { ShopifyProduct } from '../context/ShopifyContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link href="/shop" className="text-blue-600 hover:text-blue-800">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item: CartItem) => (
            <div key={item.product.id} className="flex items-center border p-4 rounded-lg">
              <div className="relative w-24 h-24 mr-4">
                <Image
                  src={item.product.images[0]?.src || '/placeholder.jpg'}
                  alt={item.product.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.product.title}</h3>
                <p className="text-gray-600">
                  ${parseFloat(item.product.variants[0]?.price?.amount || '0').toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.product.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <div className="mt-8 text-right">
            <p className="text-xl font-bold">
              Total: ${getTotalPrice().toFixed(2)}
            </p>
            <Link
              href="/checkout"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 
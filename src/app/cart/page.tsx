'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center py-4 border-b last:border-b-0">
            <div className="relative h-24 w-24 flex-shrink-0">
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0].src}
                  alt={item.product.title}
                  fill
                  className="object-cover rounded"
                />
              )}
            </div>
            <div className="ml-4 flex-grow">
              <h2 className="text-lg font-semibold">{item.product.title}</h2>
              <p className="text-gray-600">
                ${parseFloat(item.product.variants[0]?.price?.amount || '0').toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${getTotalPrice().toFixed(2)}
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 
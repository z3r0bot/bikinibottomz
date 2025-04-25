'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.product.variants.edges[0].node.price);
    return total + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    // In a real app, this would integrate with your checkout process
    alert('This is a demo store. No actual checkout process is implemented.');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-6 py-6 border-b">
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={item.product.images.edges[0].node.url}
                    alt={item.product.images.edges[0].node.altText || item.product.title}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link href={`/products/${item.product.handle}`}>{item.product.title}</Link>
                    </h3>
                    <p className="ml-4">
                      ${(parseFloat(item.product.variants.edges[0].node.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 border-r hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 border-l hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>Calculated at checkout</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
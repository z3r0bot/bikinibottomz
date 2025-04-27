'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-8">
            {cart.map(item => (
              <li key={item.variantId} className="flex items-center py-4 gap-4">
                <Image src={item.image} alt={item.title} width={80} height={80} className="rounded-lg" />
                <div className="flex-1">
                  <Link href={`/products/${item.handle}`} className="font-semibold text-lg hover:underline">{item.title}</Link>
                  <div className="text-[#ff7400] font-bold">${item.price.toFixed(2)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.variantId, Math.max(1, item.quantity - 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.variantId)} className="text-red-500 font-bold ml-4">Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-8">
            <button onClick={clearCart} className="text-sm text-gray-500 underline">Clear Cart</button>
            <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
          </div>
          <button className="w-full bg-[#ff7400] text-white py-4 rounded-lg font-bold text-xl hover:bg-orange-600 transition">Checkout</button>
        </>
      )}
    </div>
  );
} 
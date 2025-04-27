'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

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
          <button className="w-full bg-[#ff7400] text-white py-4 rounded-lg font-bold text-xl hover:bg-orange-600 transition" onClick={() => setShowCheckout(true)}>Checkout</button>
          {showCheckout && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={() => setShowCheckout(false)}></div>
              <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-8 z-10 animate-fadeIn">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowCheckout(false)}>&times;</button>
                {submitted ? (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>
                    <p className="mb-4">A confirmation has been sent to <span className="font-semibold">{checkoutData.email}</span>.</p>
                    <button className="bg-[#ff7400] text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition" onClick={() => setShowCheckout(false)}>Close</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                    <input required type="email" name="email" placeholder="Email" value={checkoutData.email} onChange={handleChange} className="w-full border rounded px-4 py-2" />
                    <input required type="text" name="name" placeholder="Full Name" value={checkoutData.name} onChange={handleChange} className="w-full border rounded px-4 py-2" />
                    <input required type="text" name="address" placeholder="Address" value={checkoutData.address} onChange={handleChange} className="w-full border rounded px-4 py-2" />
                    <div className="flex gap-2">
                      <input required type="text" name="city" placeholder="City" value={checkoutData.city} onChange={handleChange} className="flex-1 border rounded px-4 py-2" />
                      <input required type="text" name="state" placeholder="State" value={checkoutData.state} onChange={handleChange} className="flex-1 border rounded px-4 py-2" />
                    </div>
                    <div className="flex gap-2">
                      <input required type="text" name="zip" placeholder="ZIP" value={checkoutData.zip} onChange={handleChange} className="flex-1 border rounded px-4 py-2" />
                      <input required type="text" name="country" placeholder="Country" value={checkoutData.country} onChange={handleChange} className="flex-1 border rounded px-4 py-2" />
                    </div>
                    <input type="tel" name="phone" placeholder="Phone (optional, for delivery updates)" value={checkoutData.phone} onChange={handleChange} className="w-full border rounded px-4 py-2" />
                    <button type="submit" className="w-full bg-[#ff7400] text-white py-3 rounded-lg font-bold text-xl hover:bg-orange-600 transition">Place Order</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 
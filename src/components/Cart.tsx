'use client';

import { useState, useEffect } from 'react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const cartElement = document.getElementById('cart-dropdown');
      if (cartElement && !cartElement.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    try {
      setIsCheckingOut(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
        alert('There was an error with the checkout process. Please try again.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('There was an error with the checkout process. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative" id="cart-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 relative"
        aria-label="Shopping cart"
      >
        <ShoppingBagIcon className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg p-4 z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close cart"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link 
                href="/products" 
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            updateQuantity(item.id, value);
                          }
                        }}
                        className="w-16 px-2 py-1 border rounded text-center"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Clear Cart
                  </button>
                  
                  <Elements stripe={stripePromise}>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut || items.length === 0}
                      className={`flex-1 py-2 px-4 rounded text-white font-medium ${
                        isCheckingOut || items.length === 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isCheckingOut ? 'Processing...' : 'Checkout'}
                    </button>
                  </Elements>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 
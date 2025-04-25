'use client';

import { useState, useEffect } from 'react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleCheckout = () => {
    // For now, just clear the cart and show a message
    clearCart();
    alert('Thank you for your purchase! This is a demo checkout.');
    setIsOpen(false);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = getTotalPrice();

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
                  <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 rounded overflow-hidden">
                        <Image
                          src={item.product.images.edges[0]?.node.url || ''}
                          alt={item.product.images.edges[0]?.node.altText || item.product.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{item.product.title}</h3>
                        <p className="text-sm text-gray-500">
                          ${parseFloat(item.product.variants.edges[0].node.price).toFixed(2)}
                        </p>
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
                            updateQuantity(item.product.id, value);
                          }
                        }}
                        className="w-16 px-2 py-1 border rounded text-center"
                      />
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove ${item.product.title} from cart`}
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
                  
                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                    className={`flex-1 py-2 px-4 rounded text-white font-medium ${
                      items.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
} 
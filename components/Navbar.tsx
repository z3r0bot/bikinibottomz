'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState('USD $');
  const { items } = useCartStore();

  const categories = [
    { name: 'Fashion', href: '/categories/fashion' },
    { name: 'Beauty', href: '/categories/beauty' },
    { name: 'Accessories', href: '/categories/accessories' },
    { name: 'Summer', href: '/categories/summer' },
  ];

  const currencies = [
    'USD $',
    'EUR €',
    'GBP £',
    'CAD $',
    'AUD $',
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Menu button and Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-purple-600 hover:text-purple-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="ml-4 font-bold text-xl text-purple-600">
              Bikini Bottomz
            </Link>
          </div>

          {/* Center section - Desktop category links */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right section - Search, Currency, Cart */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-purple-600">
              <Search className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="text-gray-600 hover:text-purple-600"
              >
                {currency}
              </button>
              {isCurrencyOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsCurrencyOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/cart" className="text-gray-600 hover:text-purple-600 relative">
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 hover:text-purple-600 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="mt-8 space-y-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block text-lg text-gray-600 hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
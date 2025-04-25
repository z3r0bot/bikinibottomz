'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState('USD $');
  const { items } = useCartStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'Fashion', href: '/categories/fashion' },
    { name: 'Beauty', href: '/categories/beauty' },
    { name: 'Crystals', href: '/categories/crystals' },
    { name: 'Summer', href: '/categories/summer' },
  ];

  const currencies = [
    'USD $',
    'EUR €',
    'GBP £',
    'CAD $',
    'AUD $',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 group">
      {/* Background that only appears on hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section - Menu button and Logo */}
          <div className="flex items-center relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white group-hover:text-[#ff7400] transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="ml-4">
              <span className="font-dancing text-2xl text-white group-hover:text-[#ff7400] transition-colors duration-200">
                Bikini Bottoms
              </span>
            </Link>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden"
                >
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={category.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff7400] hover:to-[#ffa242] hover:text-white transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center section - Desktop category links - Only visible on hover */}
          <div className="hidden md:flex items-center space-x-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-800 hover:text-[#ff7400] transition-colors duration-200 font-poppins"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right section - Search, Currency, Cart */}
          <div className="flex items-center space-x-4">
            <button className="text-white group-hover:text-gray-800 hover:text-[#ff7400] transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="text-white group-hover:text-gray-800 hover:text-[#ff7400] transition-colors duration-200 font-poppins"
              >
                {currency}
              </button>
              <AnimatePresence>
                {isCurrencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-[#ffc367] rounded-md shadow-lg z-50"
                  >
                    {currencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#ff7400] hover:to-[#ffa242] hover:text-white transition-all duration-200 font-poppins"
                      >
                        {curr}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link 
              href="/cart" 
              className="text-white group-hover:text-gray-800 hover:text-[#ff7400] transition-colors duration-200 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[#ff7400] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {items.length}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
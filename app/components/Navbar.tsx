'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Menu, ShoppingBag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface Category {
  name: string;
  href: string;
  subcategories?: SubCategory[];
}

interface SubCategory {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState('USD $');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { items } = useCartStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const prevCount = useRef(items.length);
  const [animate, setAnimate] = useState(false);

  const isWhiteBg = isHovered || (pathname !== '/' || (typeof window !== 'undefined' && window.scrollY > 0));

  const categories: Category[] = [
    { 
      name: 'Fashion', 
      href: '/categories/fashion',
      subcategories: [
        { name: 'Tops', href: '/categories/fashion/tops' },
        { name: 'Bottoms', href: '/categories/fashion/bottoms' },
        { name: 'Bikinis', href: '/categories/fashion/bikinis' },
      ]
    },
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (pathname === '/') {
        if (currentScrollY === 0) {
          setIsVisible(true); // Always show at the very top
        } else if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Hide when scrolling down
        } else {
          setIsVisible(true); // Show when scrolling up
        }
      } else {
        setIsVisible(true); // Always visible on other pages
      }
      setLastScrollY(currentScrollY);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, pathname]);

  useEffect(() => {
    if (items.length !== prevCount.current) {
      setAnimate(true);
      prevCount.current = items.length;
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [items.length]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isWhiteBg ? 'bg-white shadow' : 'bg-transparent'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section - Menu button and Logo */}
          <div className="flex items-center relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isWhiteBg ? 'text-[#ff7400]' : 'text-white'} transition-colors duration-200`}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="ml-4">
              <span className={`font-dancing text-2xl ${isWhiteBg ? 'text-[#ff7400]' : 'text-white'} transition-colors duration-200`}>
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
                      {category.subcategories ? (
                        <div className="relative group/sub">
                          <Link
                            href={category.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff7400] hover:to-[#ffa242] hover:text-white transition-all duration-200"
                          >
                            {category.name}
                          </Link>
                          <div className="absolute left-full top-0 hidden group-hover/sub:block">
                            <div className="bg-white rounded-md shadow-lg overflow-hidden">
                              {category.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff7400] hover:to-[#ffa242] hover:text-white transition-all duration-200 whitespace-nowrap"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={category.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff7400] hover:to-[#ffa242] hover:text-white transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center section - Always show categories */}
          <div className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`font-poppins transition-colors duration-200 ${isWhiteBg ? 'text-[#ff7400] hover:text-[#ffa242]' : 'text-white hover:text-[#ff7400]'}`}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Right section - Search, Currency, Cart */}
          <div className="flex items-center space-x-6">
            <button className={`${isWhiteBg ? 'text-[#ff7400]' : 'text-white'} transition-colors duration-200`}>
              <Search className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className={`font-poppins transition-colors duration-200 ${isWhiteBg ? 'text-[#ff7400]' : 'text-white'}`}
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
            <Link href="/cart" className={`text-gray-600 hover:text-purple-600 relative`}>
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-300 ${animate ? 'scale-125' : 'scale-100'}`}
                  style={{ boxShadow: '0 0 0 2px white' }}
                >
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
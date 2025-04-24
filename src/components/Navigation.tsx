'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import Cart from './Cart';

export default function Navigation() {
  const { theme } = useTheme();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-primary-light/80 dark:bg-primary-dark/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Bikini Bottoms
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/categories/fashion" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            Fashion
          </Link>
          <Link href="/categories/beauty" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            Beauty
          </Link>
          <Link href="/categories/summer" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            Summer
          </Link>
          <Link href="/categories/crystals" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
            Crystals
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <Cart />
          <ThemeToggle />
          <Link href="/shop" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      </nav>
    </header>
  );
} 
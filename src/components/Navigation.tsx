'use client';

import Link from 'next/link';
import Cart from './Cart';

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-primary-light/80 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Bikini Bottomz
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/categories/fashion" className="hover:text-accent-light transition-colors">
            Fashion
          </Link>
          <Link href="/categories/beauty" className="hover:text-accent-light transition-colors">
            Beauty
          </Link>
          <Link href="/categories/summer" className="hover:text-accent-light transition-colors">
            Summer
          </Link>
          <Link href="/categories/crystals" className="hover:text-accent-light transition-colors">
            Crystals
          </Link>
          <Cart />
        </div>
      </nav>
    </header>
  );
} 
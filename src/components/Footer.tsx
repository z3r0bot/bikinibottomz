'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-secondary-light dark:bg-secondary-dark py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BikinibottomZ</h3>
            <p className="text-sm">
              Your destination for fashion, beauty, and crystal accessories.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/categories/fashion" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Fashion</Link></li>
              <li><Link href="/categories/beauty" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Beauty</Link></li>
              <li><Link href="/categories/summer" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Summer</Link></li>
              <li><Link href="/categories/crystals" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Crystals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Contact</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Shipping & Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Twitter</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light dark:hover:text-accent-dark">Pinterest</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} BikinibottomZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
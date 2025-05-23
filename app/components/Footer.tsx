'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categories/fashion" className="text-gray-600 hover:text-[#ff7400]">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/summer" className="text-gray-600 hover:text-[#ff7400]">
                  Summer
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-gray-600 hover:text-[#ff7400]">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Information
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#ff7400]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#ff7400]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#ff7400]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-[#ff7400]">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#ff7400]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#ff7400]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#ff7400]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#ff7400]">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#ff7400] focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#ff7400] to-[#ffa242] text-white rounded-r-md hover:from-[#ff7400] hover:to-[#ff7400] focus:outline-none focus:ring-2 focus:ring-[#ff7400] focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Bikini Bottom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
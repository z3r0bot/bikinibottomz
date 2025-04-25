'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/categories/fashion" className="text-sm hover:text-accent-light">Fashion</Link></li>
              <li><Link href="/categories/beauty" className="text-sm hover:text-accent-light">Beauty</Link></li>
              <li><Link href="/categories/summer" className="text-sm hover:text-accent-light">Summer</Link></li>
              <li><Link href="/categories/crystals" className="text-sm hover:text-accent-light">Crystals</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-accent-light">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-accent-light">Contact</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-accent-light">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm hover:text-accent-light">Shipping & Returns</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light">Twitter</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent-light">Pinterest</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-full border"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Bikini Bottomz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 
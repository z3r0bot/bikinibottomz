'use client';

import Link from 'next/link';
import Image from 'next/image';
import FashionTile from './components/tiles/fashion-tile-simple-bell-dress.svg';
import BeautyTile from './components/tiles/beauty-tile.svg';
import SummerTile from './components/tiles/summer-tile.svg';
import AccessoriesTile from './components/tiles/accessories-tile.svg';

export default function HomePage() {
  const prefix = process.env.NODE_ENV === 'production' ? '/bikinibottomz' : '';

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Bikini Bottomz</h1>
          <p className="text-xl mb-8">Discover our latest collection of beachwear and accessories</p>
          <Link href="/shop" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-secondary-light">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              // Map category slug to image filename
              const imgMap: Record<string, string> = {
                fashion: `${prefix}/images/categories/tiles/fashion-tile-simple-bell-dress.png`,
                beauty: `${prefix}/images/categories/tiles/beauty-tile.png`,
                summer: `${prefix}/images/categories/tiles/summer-tile.png`,
                accessories: `${prefix}/images/categories/tiles/accessories-tile.png`,
              };
              return (
                <Link key={category.name} href={`/categories/${category.slug}`}>
                  <div className="aspect-square border-2 border-dashed border-orange-400 rounded-lg overflow-hidden hover:scale-105 transition-transform bg-white flex items-center justify-center">
                    <img 
                      src={imgMap[category.slug]} 
                      alt={`${category.name} tile`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest products and exclusive offers.
          </p>
          <form className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full bg-secondary-light"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

const categories = [
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Summer', slug: 'summer' },
  { name: 'Accessories', slug: 'accessories' },
]; 
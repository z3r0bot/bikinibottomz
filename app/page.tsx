'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import TrendingProducts from './components/TrendingProducts';
import { getImagePath } from '../lib/utils';
import { useEffect } from 'react';
import { getProducts } from '../lib/shopify';
import { useShopify } from './context/ShopifyContext';
import ShopifyDebug from './components/ShopifyDebug';
import ShopifyTest from './components/ShopifyTest';

export default function Home() {
  const { products, isLoading, error } = useShopify();
  const categories = [
    { name: 'Fashion', href: '/categories/fashion' },
    { name: 'Beauty', href: '/categories/beauty' },
    { name: 'Accessories', href: '/categories/accessories' },
    { name: 'Summer', href: '/categories/summer' },
  ];

  // Debug output
  useEffect(() => {
    console.log('Shopify Products:', products);
    console.log('Loading:', isLoading);
    console.log('Error:', error);
  }, [products, isLoading, error]);

  return (
    <div className="scroll-smooth">
      <ShopifyDebug />
      {/* Hero Section with Three Images */}
      <div className="relative h-screen w-full flex">
        {/* First Hero Image (Left) */}
        <div className="flex-1 relative hero-image-container">
          <Image
            src={getImagePath('/images/hero/hero1.jpg')}
            alt="Hero 1"
            fill
            className="object-cover"
            priority
            sizes="33vw"
          />
        </div>

        {/* Orange Divider */}
        <div className="w-[2px] bg-gradient-to-b from-[#ff7400]/50 via-[#ffa242]/50 to-[#ff7400]/50 z-10" />

        {/* Second Hero Image (Middle) */}
        <div className="flex-1 relative hero-image-container">
          <Image
            src={getImagePath('/images/hero/hero2.jpg')}
            alt="Hero 2"
            fill
            className="object-cover"
            priority
            sizes="33vw"
          />
        </div>

        {/* Orange Divider */}
        <div className="w-[2px] bg-gradient-to-b from-[#ff7400]/50 via-[#ffa242]/50 to-[#ff7400]/50 z-10" />

        {/* Third Hero Image */}
        <div className="flex-1 relative hero-image-container">
          <Image
            src={getImagePath('/images/hero/hero3.jpg')}
            alt="Hero 3"
            fill
            className="object-cover"
            priority
            sizes="33vw"
          />
        </div>

        {/* Centered Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center bg-black/30">
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-dancing drop-shadow-lg tracking-wider">
                Bikini Bottoms
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg font-raleway">
                Your premier destination for beachwear and accessories
              </p>
              <a
                href="#categories"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#ff7400] to-[#ffa242] text-white rounded-md hover:from-[#ff7400] hover:to-[#ff7400] transition-all duration-200 text-lg font-medium hover:scale-105 transform shadow-lg"
              >
                Shop Now
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-dancing font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group"
              >
                <div className="aspect-square bg-gray-50 rounded-lg p-6 flex items-center justify-center hover:bg-[#ff7400]/10 transition-colors">
                  <h3 className="text-xl font-raleway font-medium text-center group-hover:text-[#ff7400]">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <TrendingProducts />

      {/* Debug Section */}
      <div className="fixed bottom-4 right-4 z-50">
        <ShopifyTest />
      </div>
    </div>
  );
} 
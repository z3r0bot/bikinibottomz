'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const categories = [
    {
      name: 'Fashion',
      image: '/images/custom/fashion.jpg', // You can add your image here
      href: '/categories/fashion',
    },
    {
      name: 'Beauty',
      image: '/images/custom/beauty.jpg', // You can add your image here
      href: '/categories/beauty',
    },
    {
      name: 'Crystals',
      image: '/images/custom/crystals.jpg', // You can add your image here
      href: '/categories/crystals',
    },
    {
      name: 'Summer',
      image: '/images/custom/summer.jpg', // You can add your image here
      href: '/categories/summer',
    },
  ];

  return (
    <main>
      {/* Hero Section with Three Images */}
      <div className="relative h-screen w-full flex">
        {/* First Hero Image */}
        <div className="flex-1 relative">
          <Image
            src="/images/hero/hero1.png"
            alt="Hero 1"
            fill
            className="object-cover"
            priority
            sizes="33vw"
          />
        </div>

        {/* Orange Divider */}
        <div className="w-[3px] bg-gradient-to-b from-[#ff7400] via-[#ffa242] to-[#ff7400] z-10" />

        {/* Second Hero Image */}
        <div className="flex-1 relative">
          <Image
            src="/images/hero/hero2.png"
            alt="Hero 2"
            fill
            className="object-cover"
            priority
            sizes="33vw"
          />
        </div>

        {/* Orange Divider */}
        <div className="w-[3px] bg-gradient-to-b from-[#ff7400] via-[#ffa242] to-[#ff7400] z-10" />

        {/* Third Hero Image */}
        <div className="flex-1 relative">
          <Image
            src="/images/hero/hero3.png"
            alt="Hero 3"
            fill
            className="object-cover"
            priority
            sizes="33vw"
          />
        </div>

        {/* Centered Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-20">
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/shell-logo.png"
                alt="Shell Logo"
                width={120}
                height={120}
                className="mx-auto mb-8"
                priority
              />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-pacifico drop-shadow-lg">
                Bikini Bottoms
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow">
                Your premier destination for beachwear and accessories
              </p>
              <Link
                href="/collections"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#ff7400] to-[#ffa242] text-white rounded-md hover:from-[#ff7400] hover:to-[#ff7400] transition-all duration-200 text-lg font-medium hover:scale-105 transform"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Grid - Full Width */}
      <div className="px-4 py-16 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12 font-pacifico text-[#ff7400]">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[2000px] mx-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              {/* Category Image */}
              <div className="absolute inset-0 bg-gray-200">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
              
              {/* Category Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
              
              {/* Category Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white drop-shadow-lg">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 
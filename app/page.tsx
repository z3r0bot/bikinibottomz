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
      {/* Hero Section with Background Image */}
      <div className="relative h-[600px] w-full">
        {/* Add your hero background image here */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/custom/hero.jpg')", // Add your hero image here
            // If no image is set, use gradient as fallback
            backgroundColor: '#ff7400',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" /> {/* Optional overlay */}
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-pacifico">
              Bikini Bottoms
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Your premier destination for beachwear and accessories
            </p>
            <Link
              href="/collections"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#ff7400] to-[#ffa242] text-white rounded-md hover:from-[#ff7400] hover:to-[#ff7400] transition-all duration-200 text-lg font-medium"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Grid - Full Width */}
      <div className="px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[2000px] mx-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-square overflow-hidden rounded-lg"
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
                <h3 className="text-3xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 
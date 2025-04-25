'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Beach background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff7400]/80 to-[#ffc367]/80" />
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Welcome to Bikini Bottomz</h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link
              href="/collections"
              className="inline-block bg-white text-[#ff7400] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#ff7400] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-[#ff7400]"
          >
            Featured Categories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Fashion', image: '/images/categories/fashion.jpg', href: '/categories/fashion' },
              { name: 'Beauty', image: '/images/categories/beauty.jpg', href: '/categories/beauty' },
              { name: 'Crystals', image: '/images/categories/crystals.jpg', href: '/categories/crystals' },
              { name: 'Summer', image: '/images/categories/summer.jpg', href: '/categories/summer' },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Link href={category.href} className="group block relative overflow-hidden rounded-lg">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff7400]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 
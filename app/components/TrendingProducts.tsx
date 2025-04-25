'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImagePath } from '../../lib/utils';

const trendingProducts = [
  {
    id: 1,
    name: 'Crystal Beach Necklace',
    price: 49.99,
    image: '/images/products/crystal-necklace.jpg',
    margin: 65,
  },
  {
    id: 2,
    name: 'Summer Breeze Dress',
    price: 79.99,
    image: '/images/products/summer-dress.jpg',
    margin: 60,
  },
  {
    id: 3,
    name: 'Ocean Pearl Earrings',
    price: 39.99,
    image: '/images/products/pearl-earrings.jpg',
    margin: 70,
  },
  {
    id: 4,
    name: 'Beach Umbrella',
    price: 89.99,
    image: '/images/products/beach-umbrella.jpg',
    margin: 55,
  },
  {
    id: 5,
    name: 'Shell Collection Set',
    price: 129.99,
    image: '/images/products/shell-set.jpg',
    margin: 75,
  },
];

export default function TrendingProducts() {
  return (
    <section id="trending" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-dancing font-bold text-center mb-12">Trending Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {trendingProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={getImagePath(product.image)}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 vintage-filter"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-raleway font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-lg font-raleway text-[#ff7400]">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
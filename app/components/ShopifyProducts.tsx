'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShopify, ShopifyProduct } from '../context/ShopifyContext';
import { getImagePath } from '../../lib/utils';

export default function ShopifyProducts() {
  const { products, isLoading, error } = useShopify();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products by category if a category is selected
  const filteredProducts = selectedCategory
    ? products.filter(product => product.product_type === selectedCategory)
    : products;

  // Get unique product types for category filter
  const categories = Array.from(new Set(products.map(product => product.product_type)));

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7400] mx-auto"></div>
        <p className="mt-4 font-raleway">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500 font-raleway">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-dancing font-bold text-center mb-8">Our Products</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-raleway ${
              selectedCategory === null
                ? 'bg-[#ff7400] text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-raleway ${
                selectedCategory === category
                  ? 'bg-[#ff7400] text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/products/${product.handle}`}>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={getImagePath(product.images[0].src)}
                      alt={product.images[0].alt || product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 vintage-filter"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-raleway font-medium text-gray-900">{product.title}</h3>
                  <p className="mt-1 text-lg font-raleway text-[#ff7400]">
                    ${product.variants[0]?.price || 'N/A'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
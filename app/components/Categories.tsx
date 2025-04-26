'use client';

import { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import Image from 'next/image';
import Link from 'next/link';
import LoadingState from './LoadingState';

export default function Categories() {
  const { products, isLoading, error } = useShopify();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get unique categories from products and filter out empty ones
  const categories = ['all', ...Array.from(new Set(products.map(p => p.product_type?.toLowerCase()).filter(Boolean)))];
  
  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.product_type?.toLowerCase() === selectedCategory);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7400]"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-raleway transition-colors ${
              selectedCategory === category
                ? 'bg-[#ff7400] text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const image = product.images[0];
            const variant = product.variants[0];
            const price = variant?.price?.amount || '0.00';

            return (
              <Link
                href={`/products?product=${product.handle}`}
                key={product.id}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt || product.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300 vintage-filter"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h2 className="text-lg font-medium font-raleway text-gray-900 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-[#ff7400] font-raleway">
                    ${parseFloat(price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-raleway">
                    {product.product_type}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
} 
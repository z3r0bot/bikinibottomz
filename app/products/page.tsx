'use client';

import { useEffect } from 'react';
import { useShopify } from '../context/ShopifyContext';
import LoadingState from '../components/LoadingState';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const { products, isLoading, error, refreshProducts } = useShopify();

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-center font-raleway">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-dancing text-center mb-12">Our Products</h1>
      
      {products.length === 0 ? (
        <p className="text-center font-raleway">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const image = product.images[0];
            const variant = product.variants[0];
            const price = variant?.price?.amount || '0.00';

            return (
              <Link 
                href={`/products/${product.handle}`} 
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
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
} 
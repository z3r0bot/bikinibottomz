'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct } from '../context/ShopifyContext';

interface CategoryPageProps {
  title: string;
  description: string;
  products: ShopifyProduct[];
}

export default function CategoryPage({ title, description, products }: CategoryPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className="group"
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={product.images[0]?.src || '/images/placeholder.jpg'}
                alt={product.images[0]?.alt || product.title}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-[#ff7400]">
                ${parseFloat(product.variants[0]?.price?.amount || '0').toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
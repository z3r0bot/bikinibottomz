'use client';

import { ShopifyProduct } from '../context/ShopifyContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductGridProps {
  products: ShopifyProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const router = useRouter();

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const image = product.images[0];
        const variant = product.variants[0];
        const price = variant?.price?.amount || '0.00';

        return (
          <button
            key={product.id}
            onClick={() => router.push(`/products?product=${product.handle}`)}
            className="group text-left"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt || product.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          </button>
        );
      })}
    </div>
  );
} 
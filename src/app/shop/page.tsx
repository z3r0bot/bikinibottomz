'use client';

import { useShopify } from '../../../app/context/ShopifyContext';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

export default function ShopPage() {
  const { products, isLoading, error } = useShopify();
  const addToCart = useCartStore((state) => state.addItem);

  if (isLoading) {
    return <div className="text-center p-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading products: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {product.images[0] && (
              <div className="relative h-64">
                <Image
                  src={product.images[0].src}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  ${parseFloat(product.variants[0]?.price?.amount || '0').toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
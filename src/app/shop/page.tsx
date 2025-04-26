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

  // Debug log before rendering
  console.log("Rendering products on shop page:", products);

  // Render all products directly for debugging
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-dancing font-bold text-center mb-8">Our Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            {/* Add more product details here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
} 
'use client';

import { Suspense } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { useSearchParams } from 'next/navigation';
import ProductDetail from '../components/ProductDetail';
import ProductGrid from '../components/ProductGrid';

function ProductContent() {
  const { products, isLoading } = useShopify();
  const searchParams = useSearchParams();
  const productHandle = searchParams.get('product');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7400]"></div>
        </div>
      </div>
    );
  }

  // If a product handle is specified, show the product detail view
  if (productHandle) {
    return <ProductDetail handle={productHandle} />;
  }

  // Otherwise, show the product grid
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-dancing font-bold text-center mb-8">Our Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7400]"></div>
          </div>
        </div>
      }
    >
      <ProductContent />
    </Suspense>
  );
} 
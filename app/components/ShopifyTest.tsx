'use client';

import { useEffect, useState } from 'react';
import { useShopify } from '../context/ShopifyContext';

export default function ShopifyTest() {
  const { products, isLoading, error, refreshProducts } = useShopify();
  const [debugInfo, setDebugInfo] = useState({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'Not set',
    hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  });

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50 max-w-md">
      <h3 className="font-bold mb-2">Shopify Debug Info</h3>
      <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-60">
        {JSON.stringify({
          debugInfo,
          productCount: products.length,
          isLoading,
          error,
          products: products.map(p => ({
            title: p.title,
            handle: p.handle,
            type: p.product_type,
            hasImages: p.images?.length > 0,
            variants: p.variants?.length
          }))
        }, null, 2)}
      </pre>
      <div className="mt-4 space-y-2">
        <button 
          onClick={refreshProducts}
          className="w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Refresh Products
        </button>
        <button 
          onClick={() => window.location.href = '/products'}
          className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
        >
          View Products Page
        </button>
      </div>
    </div>
  );
} 
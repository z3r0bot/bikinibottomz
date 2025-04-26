'use client';

import { useEffect } from 'react';
import { useShopify } from '../context/ShopifyContext';

export default function ShopifyTest() {
  const { products, isLoading, error } = useShopify();

  useEffect(() => {
    console.log('Raw Shopify Data:', {
      products,
      isLoading,
      error,
      productsCount: products?.length || 0,
      firstProduct: products?.[0],
    });
  }, [products, isLoading, error]);

  if (isLoading) return <div>Loading Shopify data...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="p-4 bg-white/90 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Shopify Test</h2>
      <div className="space-y-2">
        <p>Products Count: {products?.length || 0}</p>
        <p>Store Domain: {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}</p>
        <p>Has Token: {process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Yes' : 'No'}</p>
        {products?.length > 0 && (
          <div>
            <h3 className="font-semibold mt-4">First Product:</h3>
            <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(products[0], null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 
'use client';

import { useEffect } from 'react';
import { useShopify } from '../context/ShopifyContext';

export default function ShopifyDebug() {
  const { products, isLoading, error } = useShopify();

  useEffect(() => {
    console.log('Shopify Configuration:', {
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
      hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      productsCount: products?.length || 0,
      products: products?.map(p => ({
        id: p.id,
        title: p.title,
        availableForSale: p.availableForSale,
        imagesCount: p.images?.length || 0,
        variantsCount: p.variants?.length || 0
      })),
      isLoading,
      error
    });
  }, [products, isLoading, error]);

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg z-50 max-w-[500px] overflow-auto max-h-[80vh]">
      <h3 className="font-bold mb-2">Shopify Debug</h3>
      <pre className="text-xs whitespace-pre-wrap">
        {JSON.stringify({
          storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
          hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          productsCount: products?.length || 0,
          products: products?.map(p => ({
            id: p.id,
            title: p.title,
            availableForSale: p.availableForSale,
            imagesCount: p.images?.length || 0,
            variantsCount: p.variants?.length || 0
          })),
          isLoading,
          error
        }, null, 2)}
      </pre>
    </div>
  );
} 
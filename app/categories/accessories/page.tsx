'use client';

import { useShopify } from '../../context/ShopifyContext';
import AccessoriesClientPage from '../../components/AccessoriesClientPage';

export default function AccessoriesPage() {
  const { products, isLoading, error } = useShopify();
  
  // Filter products for accessories subcategories based on product type, collections, and tags
  const bags = products.filter(product => 
    product.product_type.toLowerCase() === 'bags' || 
    (product.tags || []).some(tag => tag.toLowerCase() === 'bags') ||
    product.title.toLowerCase().includes('bag')
  );
  
  const glasses = products.filter(product => 
    product.product_type.toLowerCase() === 'glasses' || 
    (product.tags || []).some(tag => tag.toLowerCase() === 'glasses') ||
    product.title.toLowerCase().includes('glasses') ||
    product.title.toLowerCase().includes('sunglasses')
  );
  
  const jewelry = products.filter(product => 
    product.product_type.toLowerCase() === 'jewelry' || 
    (product.tags || []).some(tag => tag.toLowerCase() === 'jewelry') ||
    product.title.toLowerCase().includes('jewelry') ||
    product.title.toLowerCase().includes('necklace') ||
    product.title.toLowerCase().includes('bracelet') ||
    product.title.toLowerCase().includes('earring')
  );

  const hats = products.filter(product => 
    product.product_type.toLowerCase() === 'hats' || 
    (product.tags || []).some(tag => tag.toLowerCase() === 'hats') ||
    product.title.toLowerCase().includes('hat') ||
    product.title.toLowerCase().includes('cap') ||
    product.title.toLowerCase().includes('beanie')
  );

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
    return <div>Error: {error}</div>;
  }

  return (
    <AccessoriesClientPage 
      bags={bags}
      glasses={glasses}
      jewelry={jewelry}
      hats={hats}
    />
  );
} 
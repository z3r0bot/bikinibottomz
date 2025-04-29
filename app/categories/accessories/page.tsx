'use client';

import { useShopify } from '../../context/ShopifyContext';
import AccessoriesClientPage from '../../components/AccessoriesClientPage';

export default function AccessoriesPage() {
  const { products, isLoading, error } = useShopify();
  
  // Filter products for accessories subcategories
  const bags = products.filter(product => 
    product.product_type.toLowerCase() === 'bags' || 
    product.product_type.toLowerCase() === 'accessories' && 
    (product.title.toLowerCase().includes('bag') || 
     product.title.toLowerCase().includes('tote') || 
     product.title.toLowerCase().includes('backpack'))
  );
  
  const glasses = products.filter(product => 
    product.product_type.toLowerCase() === 'glasses' || 
    product.product_type.toLowerCase() === 'accessories' && 
    (product.title.toLowerCase().includes('sunglasses') || 
     product.title.toLowerCase().includes('glasses'))
  );
  
  const jewelry = products.filter(product => 
    product.product_type.toLowerCase() === 'jewelry' || 
    product.product_type.toLowerCase() === 'accessories' && 
    (product.title.toLowerCase().includes('necklace') || 
     product.title.toLowerCase().includes('bracelet') || 
     product.title.toLowerCase().includes('earrings') || 
     product.title.toLowerCase().includes('jewelry'))
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
    />
  );
} 
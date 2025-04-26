'use client';

import { useShopify } from '../../context/ShopifyContext';
import CategoryPage from '../../components/CategoryPage';

export default function BeautyPage() {
  const { products, isLoading, error } = useShopify();
  
  // Filter products for beauty category
  const beautyProducts = products.filter(product => 
    product.product_type.toLowerCase() === 'beauty'
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CategoryPage
      title="Beauty Collection"
      description="Discover our natural beauty products inspired by the ocean."
      products={beautyProducts}
    />
  );
} 
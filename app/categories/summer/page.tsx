'use client';

import { useShopify } from '../../context/ShopifyContext';
import CategoryPage from '../../components/CategoryPage';

export default function SummerPage() {
  const { products, isLoading, error } = useShopify();
  
  // Filter products for summer category
  const summerProducts = products.filter(product => 
    product.product_type.toLowerCase() === 'summer'
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CategoryPage
      title="Summer Collection"
      description="Everything you need for a perfect day at the beach."
      products={summerProducts}
    />
  );
} 
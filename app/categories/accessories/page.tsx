'use client';

import { useShopify } from '../../context/ShopifyContext';
import CategoryPage from '../../components/CategoryPage';

export default function AccessoriesPage() {
  const { products, isLoading, error } = useShopify();
  
  // Filter products for accessories category
  const accessoryProducts = products.filter(product => 
    product.product_type.toLowerCase() === 'accessories'
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CategoryPage
      title="Accessories Collection"
      description="Complete your beach look with our stylish accessories."
      products={accessoryProducts}
    />
  );
} 
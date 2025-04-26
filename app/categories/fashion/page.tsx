'use client';

import { useShopify } from '../../context/ShopifyContext';
import CategoryPage from '../../components/CategoryPage';

export default function FashionPage() {
  const { products, isLoading, error } = useShopify();
  
  // Filter products for fashion category
  const fashionProducts = products.filter(product => 
    product.product_type.toLowerCase() === 'fashion'
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CategoryPage
      title="Fashion Collection"
      description="Discover our latest fashion collection, featuring trendy beachwear and summer essentials."
      products={fashionProducts}
    />
  );
} 
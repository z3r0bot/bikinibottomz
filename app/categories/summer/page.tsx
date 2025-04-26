'use client';

import { useShopify } from '../../context/ShopifyContext';
import CategoryPage from '../../components/CategoryPage';

export default function SummerPage() {
  const { products, isLoading, error } = useShopify();

  // Filter products for summer category by tag, type, or title
  const summerProducts = products.filter(product => {
    const hasSummerTag = product.tags && product.tags.map(tag => tag.toLowerCase()).includes('summer');
    return (
      (product.product_type && product.product_type.toLowerCase().includes('summer')) ||
      (product.title && product.title.toLowerCase().includes('summer')) ||
      hasSummerTag
    );
  });

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
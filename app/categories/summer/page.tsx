'use client';

import { useShopify } from '../../context/ShopifyContext';
import CategoryPage from '../../components/CategoryPage';
import { getCollections } from '../../../lib/shopify';

export default async function SummerPage() {
  const { products, isLoading, error } = useShopify();

  // Fetch the Dresses collection
  const collections = await getCollections();
  const dressesCollection = collections.find((col: any) => col.handle === 'dresses');
  const dressesIds = dressesCollection?.products?.map((p: any) => p.id) || [];

  // Filter products for summer category by tag, type, or title, and exclude dresses
  const summerProducts = products.filter(product => {
    const hasSummerTag = product.tags && product.tags.map(tag => tag.toLowerCase()).includes('summer');
    const isDress = dressesIds.includes(product.id);
    return (
      !isDress && (
        (product.product_type && product.product_type.toLowerCase().includes('summer')) ||
        (product.title && product.title.toLowerCase().includes('summer')) ||
        hasSummerTag
      )
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
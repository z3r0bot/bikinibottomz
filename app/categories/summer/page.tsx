import { getProducts } from '../../../lib/shopify';
import CategoryPage from '../../components/CategoryPage';

export default async function SummerPage() {
  const products = await getProducts();
  // Exclude dresses by product_type
  const summerProducts = products.filter((product: any) => {
    const isDress = (product.product_type || '').toLowerCase() === 'dresses';
    const hasSummerTag = (product.tags && (product.tags as string[]).map((tag: string) => tag.toLowerCase()).includes('summer'));
    return !isDress && (
      (product.product_type && product.product_type.toLowerCase().includes('summer')) ||
      (product.title && product.title.toLowerCase().includes('summer')) ||
      hasSummerTag
    );
  });

  return (
    <CategoryPage
      title="Summer Collection"
      description="Everything you need for a perfect day at the beach."
      products={summerProducts}
    />
  );
} 
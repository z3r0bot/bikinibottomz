import { getProducts, getCollections } from '../../../lib/shopify';
import CategoryPage from '../../components/CategoryPage';

export default async function SummerPage() {
  const products = await getProducts();
  const collections = await getCollections();
  const dressesCollection = collections.find((col: any) => col.handle === 'dresses');
  const dressesIds = dressesCollection?.products?.map((p: any) => p.id) || [];

  // Filter products for summer category by tag, type, or title, and exclude dresses
  const summerProducts = products.filter((product: any) => {
    const hasSummerTag = (product.tags && (product.tags as string[]).map((tag: string) => tag.toLowerCase()).includes('summer'));
    const isDress = dressesIds.includes(product.id);
    return (
      !isDress && (
        (product.product_type && product.product_type.toLowerCase().includes('summer')) ||
        (product.title && product.title.toLowerCase().includes('summer')) ||
        hasSummerTag
      )
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
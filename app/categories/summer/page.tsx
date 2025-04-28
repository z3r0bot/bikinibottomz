import { getProducts } from '../../../lib/shopify';
import CategoryPage from '../../components/CategoryPage';

export default async function SummerPage() {
  const products = await getProducts();
  // Exclude dresses by product_type
  const summerProducts = products.filter((product: any) => {
    const isDress = (product.product_type || '').toLowerCase() === 'dresses';
    const isTwoPiece = (product.product_type || '').toLowerCase() === '2 pieces' || (product.product_type || '').toLowerCase() === '2 piece';
    const hasSummerTag = (product.tags && (product.tags as string[]).map((tag: string) => tag.toLowerCase()).includes('summer'));
    return !isDress && !isTwoPiece && (
      (product.product_type && product.product_type.toLowerCase().includes('summer')) ||
      (product.title && product.title.toLowerCase().includes('summer')) ||
      hasSummerTag
    );
  });
  const twoPieces = products.filter((product: any) => (product.product_type || '').toLowerCase() === '2 pieces' || (product.product_type || '').toLowerCase() === '2 piece');
  return (
    <>
      <CategoryPage
        title="Summer Collection"
        description="Everything you need for a perfect day at the beach."
        products={summerProducts}
      />
      {twoPieces.length > 0 && (
        <CategoryPage
          title="2 Piece Collection"
          description="Mix and match with our stylish 2 piece sets."
          products={twoPieces}
        />
      )}
    </>
  );
} 
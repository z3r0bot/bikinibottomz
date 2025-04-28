import { getProducts } from '../../../lib/shopify';
import FashionClientPage from '../../components/FashionClientPage';

export default async function FashionPage() {
  const products = await getProducts();
  const normalizeType = (type: string) => (type || '').replace(/[-\s]/g, '').toLowerCase();
  const dresses = products.filter((product: any) => normalizeType(product.product_type) === 'dresses');
  const twoPieces = products.filter((product: any) => {
    const t = normalizeType(product.product_type);
    return t === '2pieces' || t === '2piece';
  });
  return <FashionClientPage dresses={dresses} twoPieces={twoPieces} />;
} 
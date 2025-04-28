import { getProducts } from '../../../lib/shopify';
import FashionClientPage from '../../components/FashionClientPage';

export default async function FashionPage() {
  const products = await getProducts();
  const dresses = products.filter((product: any) => (product.product_type || '').toLowerCase() === 'dresses');
  const twoPieces = products.filter((product: any) => (product.product_type || '').toLowerCase() === '2 pieces' || (product.product_type || '').toLowerCase() === '2 piece');
  return <FashionClientPage dresses={dresses} twoPieces={twoPieces} />;
} 
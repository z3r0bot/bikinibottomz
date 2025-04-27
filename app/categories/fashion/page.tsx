import { getProducts } from '../../../lib/shopify';
import FashionClientPage from '../../components/FashionClientPage';

export default async function FashionPage() {
  const products = await getProducts();
  const dresses = products.filter((product: any) => (product.product_type || '').toLowerCase() === 'dresses');
  return <FashionClientPage dresses={dresses} />;
} 
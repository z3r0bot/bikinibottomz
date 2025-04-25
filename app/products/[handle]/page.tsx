import ProductDetailClient from './ProductDetailClient';

// This is used by Next.js to generate static paths at build time
export async function generateStaticParams() {
  // For demo purposes, we'll use our mock products
  return [
    { handle: 'summer-bikini-set' },
    { handle: 'crystal-necklace' },
    { handle: 'beach-cover-up' },
    { handle: 'summer-dress' }
  ];
}

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  return <ProductDetailClient handle={params.handle} />;
} 
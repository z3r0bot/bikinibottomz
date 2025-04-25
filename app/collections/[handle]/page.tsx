import CollectionDetailClient from './CollectionDetailClient';

// This is used by Next.js to generate static paths at build time
export async function generateStaticParams() {
  // For demo purposes, we'll use our mock collections
  return [
    { handle: 'summer-collection' },
    { handle: 'beach-essentials' },
    { handle: 'accessories' },
    { handle: 'new-arrivals' }
  ];
}

export default function CollectionPage({ params }: { params: { handle: string } }) {
  return <CollectionDetailClient handle={params.handle} />;
} 
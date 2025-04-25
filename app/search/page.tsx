'use client';

import { useSearchParams } from 'next/navigation';
import CategoryPage from '@/components/CategoryPage';

// This would typically come from your API based on the search query
const searchProducts = (query: string) => {
  // Mock data - in a real app, this would search your product database
  const allProducts = [
    {
      id: '1',
      name: 'Summer Dress',
      price: 89.99,
      image: '/images/products/summer-dress.jpg',
      handle: 'summer-dress'
    },
    {
      id: '2',
      name: 'Beach Cover Up',
      price: 49.99,
      image: '/images/products/beach-cover-up.jpg',
      handle: 'beach-cover-up'
    },
    {
      id: '3',
      name: 'Crystal Necklace',
      price: 79.99,
      image: '/images/products/crystal-necklace.jpg',
      handle: 'crystal-necklace'
    },
    // Add more products as needed
  ];

  return allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const products = searchProducts(query);

  return (
    <CategoryPage
      title={`Search Results for "${query}"`}
      description={`Found ${products.length} products matching your search.`}
      products={products}
    />
  );
} 
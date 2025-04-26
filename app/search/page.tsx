'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShopifyProduct } from '../context/ShopifyContext';
import CategoryPage from '../components/CategoryPage';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function searchProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to search products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Failed to search products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <div className="text-center p-8">Searching products...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  if (!query) {
    return <div className="text-center p-8">Please enter a search term.</div>;
  }

  return (
    <CategoryPage
      title={`Search Results for "${query}"`}
      description={`Found ${products.length} products matching your search.`}
      products={products}
    />
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
} 
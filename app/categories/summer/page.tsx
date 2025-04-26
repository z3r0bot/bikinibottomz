'use client';

import { useEffect, useState } from 'react';
import CategoryPage from '../../components/CategoryPage';

export default function SummerPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummerCollection() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/collections/summer');
        if (!res.ok) throw new Error('Failed to fetch summer collection');
        const collection = await res.json();
        setProducts(collection.products.edges.map((edge: any) => edge.node));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch summer collection');
      } finally {
        setIsLoading(false);
      }
    }
    fetchSummerCollection();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CategoryPage
      title="Summer Collection"
      description="Everything you need for a perfect day at the beach."
      products={products}
    />
  );
} 
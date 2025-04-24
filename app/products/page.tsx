'use client';

import { useEffect, useState } from 'react';
import client from '../../lib/shopify';

interface Product {
  id: string;
  title: string;
  description: string;
  images: {
    edges: {
      node: {
        url: string;
      };
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await client.product.fetchAll();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            {product.images.edges[0] && (
              <img
                src={product.images.edges[0].node.url}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold">
                ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
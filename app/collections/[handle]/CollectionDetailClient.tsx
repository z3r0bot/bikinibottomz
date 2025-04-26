'use client';

import { useEffect, useState } from 'react';
import { ShopifyProduct } from '../../../app/context/ShopifyContext';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
  } | null;
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export default function CollectionDetailClient({ handle }: { handle: string }) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { addItem } = useCartStore();

  useEffect(() => {
    async function loadCollection() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/collections/${handle}`);
        if (!response.ok) {
          throw new Error('Failed to fetch collection');
        }
        const fetchedCollection = await response.json();
        setCollection(fetchedCollection);
      } catch (err) {
        console.error(`Error fetching collection with handle ${handle}:`, err);
        setError('Failed to load collection. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      loadCollection();
    }
  }, [handle]);

  const handleAddToCart = (product: ShopifyProduct) => {
    addItem(product);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error || 'Collection not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{collection.title}</h1>
        {collection.description && (
          <p className="text-lg text-gray-600">{collection.description}</p>
        )}
      </div>

      {collection.products.edges.length === 0 ? (
        <p className="text-center text-gray-600">No products found in this collection.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collection.products.edges.map(({ node: product }) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link href={`/products/${product.handle}`}>
                <div className="relative h-64">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt || product.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.handle}`}>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
                    {product.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    ${parseFloat(product.variants[0]?.price?.amount || '0').toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
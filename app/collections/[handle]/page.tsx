'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Collection, Product } from '@/lib/shopify';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

export default function CollectionDetailPage() {
  const params = useParams();
  const handle = params.handle as string;
  
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

  const handleAddToCart = (product: Product) => {
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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error || 'Collection not found'}</span>
          <Link 
            href="/collections" 
            className="mt-2 inline-block bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-1 px-4 rounded"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/collections" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Collections
        </Link>
      </div>

      {/* Collection Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{collection.title}</h1>
        {collection.description && (
          <p className="text-gray-600 max-w-3xl">{collection.description}</p>
        )}
      </div>

      {/* Collection Image */}
      {collection.image && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Products Grid */}
      {collection.products.edges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No products found in this collection.</p>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collection.products.edges.map(({ node: product }) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link href={`/products/${product.handle}`}>
                <div className="aspect-w-1 aspect-h-1 relative">
                  {product.images.edges[0]?.node.url ? (
                    <Image
                      src={product.images.edges[0].node.url}
                      alt={product.images.edges[0].node.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
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
                    ${parseFloat(product.variants.edges[0].node.price).toFixed(2)}
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
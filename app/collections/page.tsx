'use client';

import { useEffect, useState } from 'react';
import { Collection, fetchAllCollections } from '../../lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCollections() {
      try {
        setLoading(true);
        setError(null);
        const fetchedCollections = await fetchAllCollections();
        setCollections(fetchedCollections);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('Failed to load collections. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadCollections();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-1 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shop by Collection</h1>
      
      {collections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No collections found.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.handle}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-w-16 aspect-h-9">
                  {collection.image ? (
                    <Image
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {collection.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{collection.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {collection.products.length} {collection.products.length === 1 ? 'product' : 'products'}
                    </span>
                    <span className="text-blue-600 font-medium group-hover:underline">
                      View Collection
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 
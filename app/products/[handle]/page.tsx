'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/lib/shopify';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const handle = params.handle as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCartStore();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/products/${handle}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const fetchedProduct = await response.json();
        setProduct(fetchedProduct);
      } catch (err) {
        console.error(`Error fetching product with handle ${handle}:`, err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      loadProduct();
    }
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
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

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error || 'Product not found'}</span>
          <Link 
            href="/products" 
            className="mt-2 inline-block bg-red-100 hover:bg-red-200 text-red-800 font-semibold py-1 px-4 rounded"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex].node;
  const mainImage = product.images.edges[0]?.node;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText || product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${parseFloat(selectedVariant.price).toFixed(2)}
          </p>
          
          <div className="mb-6">
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>
          
          {/* Variant Selection */}
          {product.variants.edges.length > 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.edges.map(({ node: variant }, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`py-2 px-4 border rounded-md text-sm ${
                      selectedVariantIndex === index
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 p-2 border-t border-b border-gray-300 text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant.availableForSale}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              selectedVariant.availableForSale
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedVariant.availableForSale ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
} 
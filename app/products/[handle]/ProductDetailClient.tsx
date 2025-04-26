'use client';

import { useEffect, useState } from 'react';
import { ShopifyProduct, ShopifyVariant } from '../../../app/context/ShopifyContext';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailClient({ handle }: { handle: string }) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
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
        <div className="text-center text-red-500">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const mainImage = product.images[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage.src}
              alt={mainImage.alt || product.title}
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
            ${parseFloat(selectedVariant.price.amount).toFixed(2)}
          </p>
          
          <div className="mb-6">
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>
          
          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant: ShopifyVariant, index: number) => (
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
            className="w-full py-3 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 
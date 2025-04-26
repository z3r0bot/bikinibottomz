'use client';

import { useEffect, useState } from 'react';
import { ShopifyProduct, ShopifyVariant, useShopify } from '../context/ShopifyContext';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ handle }: { handle: string }) {
  const { products } = useShopify();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const router = useRouter();

  // Find the product with matching handle
  const product = products.find(p => p.handle === handle);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Product not found
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const mainImage = product.images[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-[#ff7400] hover:text-[#ff7400]/80 transition-colors"
      >
        ← Back to Products
      </button>

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
          <p className="text-2xl font-bold text-[#ff7400] mb-4">
            ${parseFloat(selectedVariant.price.amount).toFixed(2)} {selectedVariant.price.currencyCode}
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
                        ? 'border-[#ff7400] bg-[#ff7400]/10 text-[#ff7400]'
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
            className="w-full py-3 px-4 rounded-md text-white font-medium bg-[#ff7400] hover:bg-[#ff7400]/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 
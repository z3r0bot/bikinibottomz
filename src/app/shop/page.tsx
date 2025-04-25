'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/shopify';
import Image from 'next/image';

const products: Product[] = [
  {
    id: '1',
    title: 'Summer Bikini Set',
    handle: 'summer-bikini-set',
    description: 'Beautiful summer bikini set with tropical print',
    images: {
      edges: [
        {
          node: {
            url: '/images/bikini-1.jpg',
            altText: 'Summer Bikini Set'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: '1',
            price: '49.99',
            title: 'Default',
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Crystal Necklace',
    handle: 'crystal-necklace',
    description: 'Handmade crystal necklace with healing properties',
    images: {
      edges: [
        {
          node: {
            url: '/images/crystal-1.jpg',
            altText: 'Crystal Necklace'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: '2',
            price: '29.99',
            title: 'Default',
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Beach Cover-up',
    handle: 'beach-cover-up',
    description: 'Light and airy beach cover-up',
    images: {
      edges: [
        {
          node: {
            url: '/images/coverup-1.jpg',
            altText: 'Beach Cover-up'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: '3',
            price: '39.99',
            title: 'Default',
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '4',
    title: 'Summer Dress',
    handle: 'summer-dress',
    description: 'Elegant summer dress perfect for any occasion',
    images: {
      edges: [
        {
          node: {
            url: '/images/dress-1.jpg',
            altText: 'Summer Dress'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: '4',
            price: '59.99',
            title: 'Default',
            availableForSale: true
          }
        }
      ]
    }
  }
];

export default function ShopPage() {
  const { addItem } = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Our Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={product.images.edges[0]?.node.url || ''}
                alt={product.images.edges[0]?.node.altText || product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${parseFloat(product.variants.edges[0].node.price).toFixed(2)}
                </span>
                <button
                  onClick={() => addItem(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
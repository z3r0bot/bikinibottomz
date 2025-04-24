'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

const products = [
  {
    id: '1',
    name: 'Summer Bikini Set',
    price: 49.99,
    image: '/images/bikini-1.jpg',
    description: 'Beautiful summer bikini set with tropical print',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Crystal Necklace',
    price: 29.99,
    image: '/images/crystal-1.jpg',
    description: 'Handmade crystal necklace with healing properties',
    quantity: 1,
  },
  {
    id: '3',
    name: 'Beach Cover-up',
    price: 39.99,
    image: '/images/coverup-1.jpg',
    description: 'Light and airy beach cover-up',
    quantity: 1,
  },
  {
    id: '4',
    name: 'Summer Dress',
    price: 59.99,
    image: '/images/dress-1.jpg',
    description: 'Elegant summer dress perfect for any occasion',
    quantity: 1,
  },
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
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
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
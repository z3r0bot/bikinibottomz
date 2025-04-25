'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // This is just a placeholder. In a real app, you would fetch products based on the category
  const products = [
    { id: '1', name: 'Product 1', price: 29.99 },
    { id: '2', name: 'Product 2', price: 39.99 },
    { id: '3', name: 'Product 3', price: 49.99 },
    { id: '4', name: 'Product 4', price: 59.99 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-primary-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-secondary-light"></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-blue-600 font-medium">${product.price}</p>
              <button className="mt-4 w-full btn btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
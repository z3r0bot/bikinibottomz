'use client';

import { useParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function CategoryPage() {
  const params = useParams();
  const { theme } = useTheme();
  const category = params.category as string;
  
  // Format category name for display
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{formattedCategory}</h1>
      
      {/* Placeholder for product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={index} 
            className="bg-primary-light dark:bg-primary-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-secondary-light dark:bg-secondary-dark"></div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Product {index + 1}</h3>
              <p className="text-sm mb-2">$99.99</p>
              <button className="btn btn-primary w-full">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
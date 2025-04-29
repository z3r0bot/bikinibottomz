"use client";
import { useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function AccessoriesClientPage({ bags, glasses, jewelry }: { bags: any[], glasses?: any[], jewelry?: any[] }) {
  const [modalProduct, setModalProduct] = useState<any | null>(null);
  const [currentCategory, setCurrentCategory] = useState(0); // 0: Bags, 1: Glasses, 2: Jewelry

  const categories = [
    { products: bags, label: 'Bags' },
    { products: glasses || [], label: 'Glasses' },
    { products: jewelry || [], label: 'Jewelry' },
  ];
  const { products, label } = categories[currentCategory];

  const handlePrev = () => setCurrentCategory((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentCategory((prev) => Math.min(categories.length - 1, prev + 1));

  // Helper to get the first real product image
  function getMainImage(images: any[]) {
    return images.find((img: any) => {
      const alt = (img.alt || '').toLowerCase();
      const src = (img.src || '').toLowerCase();
      return !alt.includes('size') && !alt.includes('chart') && !alt.includes('table') && !src.includes('size') && !src.includes('chart') && !src.includes('table');
    }) || images[0];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20 relative">
      {/* Arrows */}
      {currentCategory > 0 && (
        <button
          className="fixed left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full h-14 w-14 flex items-center justify-center text-3xl text-[#ff7400] z-50 hover:bg-[#ff7400] hover:text-white transition"
          onClick={handlePrev}
          aria-label="Previous category"
        >
          <ArrowLeft size={32} />
        </button>
      )}
      {currentCategory < categories.length - 1 && (
        <button
          className="fixed right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full h-14 w-14 flex items-center justify-center text-3xl text-[#ff7400] z-50 hover:bg-[#ff7400] hover:text-white transition"
          onClick={handleNext}
          aria-label="Next category"
        >
          <ArrowRight size={32} />
        </button>
      )}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessories Collection</h1>
        {/* Bubbles */}
        <div className="flex justify-center gap-4 mt-2 mb-2">
          {categories.map((cat, idx) => (
            <button
              key={cat.label}
              className={`h-4 w-4 rounded-full border-2 ${currentCategory === idx ? 'bg-[#ff7400] border-[#ff7400]' : 'bg-gray-300 border-gray-400'} transition`}
              onClick={() => setCurrentCategory(idx)}
              aria-label={cat.label}
            />
          ))}
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">{label}</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No {label.toLowerCase()} available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const image = getMainImage(product.images);
              const variant = product.variants[0];
              const price = variant?.price?.amount || '0.00';
              
              return (
                <div 
                  key={product.id} 
                  className="group cursor-pointer"
                  onClick={() => setModalProduct(product)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt || product.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-[#ff7400]">
                      ${parseFloat(price).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Product Modal */}
      {modalProduct && (
        <ProductModal 
          product={modalProduct} 
          open={!!modalProduct}
          onClose={() => setModalProduct(null)} 
        />
      )}
    </div>
  );
} 
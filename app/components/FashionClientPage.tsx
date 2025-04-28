"use client";
import { useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FASHION_CATEGORIES = [
  { key: 'dresses', label: 'Dresses' },
  { key: 'twoPieces', label: '2 Pieces' },
];

export default function FashionClientPage({ dresses, twoPieces, tops }: { dresses: any[], twoPieces?: any[], tops?: any[] }) {
  const [modalProduct, setModalProduct] = useState<any | null>(null);
  const [currentCategory, setCurrentCategory] = useState(0); // 0: Dresses, 1: 2 Pieces, 2: Tops

  const categories = [
    { products: dresses, label: 'Dresses' },
    { products: twoPieces || [], label: '2 Pieces' },
    { products: tops || [], label: 'Tops' },
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fashion Collection</h1>
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
        <h2 className="text-3xl font-poppins font-bold text-center mb-8">{label}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No products found in this category.</div>
          ) : (
            products.map((product: any) => (
              <button key={product.id} className="group text-left" onClick={() => setModalProduct(product)}>
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                  <Image
                    src={getMainImage(product.images)?.src || '/images/placeholder.jpg'}
                    alt={getMainImage(product.images)?.alt || product.title}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-poppins font-medium text-gray-900">{product.title}</h3>
                  <p className="mt-1 text-lg font-medium text-[#ff7400]">
                    ${parseFloat(product.variants[0]?.price?.amount || '0').toFixed(2)}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
      {modalProduct && (
        <ProductModal product={modalProduct} open={!!modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </div>
  );
} 
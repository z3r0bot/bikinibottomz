"use client";
import { useState } from 'react';
import Image from 'next/image';
import ProductModal from './ProductModal';

export default function FashionClientPage({ dresses, twoPieces }: { dresses: any[], twoPieces?: any[] }) {
  const [modalProduct, setModalProduct] = useState<any | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fashion Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our latest fashion collection, featuring trendy beachwear and summer essentials.</p>
      </div>
      <div className="mb-12">
        <h2 className="text-3xl font-dancing font-bold text-center mb-8">Dresses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dresses.map((product: any) => (
            <button key={product.id} className="group text-left" onClick={() => setModalProduct(product)}>
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <Image
                  src={product.images[0]?.src || '/images/placeholder.jpg'}
                  alt={product.images[0]?.alt || product.title}
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
          ))}
        </div>
      </div>
      {twoPieces && twoPieces.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-poppins font-bold text-center mb-8">2 Pieces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {twoPieces.map((product: any) => (
              <button key={product.id} className="group text-left" onClick={() => setModalProduct(product)}>
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                  <Image
                    src={product.images[0]?.src || '/images/placeholder.jpg'}
                    alt={product.images[0]?.alt || product.title}
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
            ))}
          </div>
        </div>
      )}
      {modalProduct && (
        <ProductModal product={modalProduct} open={!!modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </div>
  );
} 
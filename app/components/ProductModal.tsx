"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, open, onClose }: { product: any, open: boolean, onClose: () => void }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  if (!open) return null;

  // Extract unique colors and sizes from variants
  const colors = Array.from(new Set(product.variants.flatMap((v: any) => v.selectedOptions.filter((o: any) => o.name.toLowerCase() === 'color').map((o: any) => o.value))));
  const sizes = Array.from(new Set(product.variants.flatMap((v: any) => v.selectedOptions.filter((o: any) => o.name.toLowerCase() === 'size').map((o: any) => o.value))));

  // Helper to get all real product images (not size charts/tables)
  function getRealImages(images: any[]) {
    return images.filter((img: any) => {
      const alt = (img.alt || '').toLowerCase();
      const src = (img.src || '').toLowerCase();
      return !alt.includes('size') && !alt.includes('chart') && !alt.includes('table') && !src.includes('size') && !src.includes('chart') && !src.includes('table');
    });
  }
  const realImages = getRealImages(product.images);
  const mainImage = realImages[0] || product.images[0];

  // Determine main image index
  const mainImageIndex = product.images.findIndex((img: any) => img.id === mainImage?.id);

  const handleSelect = (color: string, size: string) => {
    const variant = product.variants.find((v: any) =>
      v.selectedOptions.some((o: any) => o.name.toLowerCase() === 'color' && o.value === color) &&
      v.selectedOptions.some((o: any) => o.name.toLowerCase() === 'size' && o.value === size)
    );
    if (variant) setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      handle: product.handle,
      image: product.images[0]?.src || '',
      price: parseFloat(selectedVariant?.price?.amount || '0'),
      variantId: selectedVariant?.id,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={onClose}></div>
      {/* Modal box */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 z-10 animate-fadeIn">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {realImages.slice(0, 4).map((img: any, idx: number) => (
                <Image
                  key={String(img.id) || idx}
                  src={img.src}
                  alt={img.alt || product.title}
                  width={200}
                  height={200}
                  className={`rounded-lg object-cover w-full h-full${idx === 0 ? ' border-4 border-[#ff7400]' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-poppins font-bold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-xl font-semibold text-[#ff7400] mb-4">
              ${parseFloat(selectedVariant?.price?.amount || '0').toFixed(2)}
            </p>
            {/* Color selector */}
            {colors.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold">Color: </span>
                {colors.map(color => (
                  <button
                    key={String(color)}
                    className={`px-3 py-1 rounded border mr-2 mb-1 ${selectedVariant.selectedOptions.some((o: any) => o.name.toLowerCase() === 'color' && o.value === color) ? 'bg-[#ff7400] text-white' : 'bg-gray-100'}`}
                    onClick={() => handleSelect(String(color), selectedVariant.selectedOptions.find((o: any) => o.name.toLowerCase() === 'size')?.value ? String(selectedVariant.selectedOptions.find((o: any) => o.name.toLowerCase() === 'size')?.value) : String(sizes[0]))}
                  >
                    {String(color)}
                  </button>
                ))}
              </div>
            )}
            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <span className="font-semibold">Size: </span>
                {sizes.map(size => (
                  <button
                    key={String(size)}
                    className={`px-3 py-1 rounded border mr-2 mb-1 ${selectedVariant.selectedOptions.some((o: any) => o.name.toLowerCase() === 'size' && o.value === size) ? 'bg-[#ff7400] text-white' : 'bg-gray-100'}`}
                    onClick={() => handleSelect(selectedVariant.selectedOptions.find((o: any) => o.name.toLowerCase() === 'color')?.value ? String(selectedVariant.selectedOptions.find((o: any) => o.name.toLowerCase() === 'color')?.value) : String(colors[0]), String(size))}
                  >
                    {String(size)}
                  </button>
                ))}
              </div>
            )}
            <button
              className="bg-[#ff7400] text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
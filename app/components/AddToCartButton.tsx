"use client";
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const variant = product.variants[0];
    addToCart({
      id: product.id,
      title: product.title,
      handle: product.handle,
      image: product.images[0]?.src || '',
      price: parseFloat(variant?.price?.amount || '0'),
      variantId: variant?.id,
      quantity: 1,
    });
  };

  return (
    <button
      className="bg-[#ff7400] text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition"
      onClick={handleAdd}
    >
      Add to Cart
    </button>
  );
} 
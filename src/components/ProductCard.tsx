import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/shopify';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.variants[0].id,
      name: product.title,
      price: parseFloat(product.variants[0].price),
      image: product.images.edges[0]?.node.url || '',
      quantity: 1,
    });
  };

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Link href={`/products/${product.handle}`}>
          <Image
            src={product.images.edges[0]?.node.url || ''}
            alt={product.images.edges[0]?.node.altText || product.title}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.handle}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          ${parseFloat(product.variants[0].price).toFixed(2)}
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Add to cart
      </button>
    </div>
  );
} 
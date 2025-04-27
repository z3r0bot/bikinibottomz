import { getProductByHandle, getProducts } from '../../../lib/shopify';
import Image from 'next/image';
import dynamic from 'next/dynamic';

interface ProductPageProps {
  params: { handle: string };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: any) => ({ handle: product.handle }));
}

const AddToCartButton = dynamic(() => import('../../components/AddToCartButton'), { ssr: false });

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.handle);
  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            {product.images?.map((img: any, idx: number) => (
              <Image
                key={img.id || idx}
                src={img.src}
                alt={img.alt || product.title}
                width={600}
                height={600}
                className="rounded-lg object-cover w-full h-full"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-[#ff7400] mb-6">
            ${parseFloat(product.variants[0]?.price?.amount || '0').toFixed(2)}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
} 
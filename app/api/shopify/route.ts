import { NextResponse } from 'next/server';
import { getProducts } from '../../../lib/shopify';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: string;
      };
    }>;
  };
}

export async function GET() {
  try {
    const products = await getProducts();
    const formattedProducts = products.map((product: ShopifyProduct) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      image: product.images.edges[0]?.node.url || '',
      altText: product.images.edges[0]?.node.altText || '',
      price: product.variants.edges[0]?.node.price || '0.00',
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import { shopifyClient, PRODUCTS_QUERY } from '@/lib/shopify';

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY) {
    return NextResponse.json(
      { error: 'Shopify configuration is missing' },
      { status: 500 }
    );
  }

  try {
    const { data } = await shopifyClient.query({
      query: PRODUCTS_QUERY,
    });

    const products = data.products.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      images: node.images.edges.map(({ node: image }: any) => ({
        id: image.id,
        src: image.url,
        alt: image.altText,
      })),
      variants: node.variants.edges.map(({ node: variant }: any) => ({
        id: variant.id,
        price: variant.price.amount,
        title: variant.title,
      })),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 
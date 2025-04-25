import { NextResponse } from 'next/server';

// GraphQL query
const PRODUCTS_QUERY = `
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                title
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY) {
    return NextResponse.json(
      { error: 'Shopify configuration is missing' },
      { status: 500 }
    );
  }

  try {
    console.log('Fetching products from Shopify...');
    console.log('Store domain:', process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
    
    // Use fetch directly to avoid type issues
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY,
        },
        body: JSON.stringify({
          query: PRODUCTS_QUERY,
        }),
      }
    );

    const result = await response.json();
    
    console.log('Shopify API Response:', JSON.stringify(result, null, 2));

    if (result.errors) {
      return NextResponse.json(
        { error: result.errors[0].message },
        { status: 400 }
      );
    }

    const products = result.data.products.edges.map(({ node }: any) => ({
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
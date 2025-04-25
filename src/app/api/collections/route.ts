import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
        },
        body: JSON.stringify({
          query: `
            query GetCollections {
              collections(first: 24) {
                edges {
                  node {
                    id
                    handle
                    title
                    description
                    image {
                      url
                      altText
                    }
                    products(first: 24) {
                      edges {
                        node {
                          id
                          handle
                          title
                          description
                          images(first: 1) {
                            edges {
                              node {
                                url
                                altText
                              }
                            }
                          }
                          variants(first: 1) {
                            edges {
                              node {
                                id
                                price
                                title
                                availableForSale
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch collections');
    }

    const data = await response.json();
    return NextResponse.json(data.data.collections.edges.map((edge: any) => edge.node));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
} 
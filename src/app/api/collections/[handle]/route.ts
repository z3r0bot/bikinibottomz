import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const { handle } = params;
    
    // Replace this with your actual Shopify API call
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
            query GetCollection($handle: String!) {
              collection(handle: $handle) {
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
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            handle,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch collection');
    }

    const data = await response.json();
    return NextResponse.json(data.data.collection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
} 
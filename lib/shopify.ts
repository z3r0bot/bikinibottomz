import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

interface ShopifyResponse {
  data?: {
    products?: {
      edges: any[];
    };
  };
  errors?: Array<{ message: string }>;
}

// Create the Shopify client
const shopifyClient = !isBuildTime
  ? createStorefrontApiClient({
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string,
      publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
      apiVersion: '2024-07',
    })
  : null;

// GraphQL queries
const PRODUCTS_QUERY = `
  query Products {
    products(first: 250) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      images(first: 5) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
            title
            availableForSale
          }
        }
      }
    }
  }
`;

const CREATE_CHECKOUT_MUTATION = `
  mutation createCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query Collections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            id
            url
            altText
          }
        }
      }
    }
  }
`;

export {
  shopifyClient,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  CREATE_CHECKOUT_MUTATION,
  COLLECTIONS_QUERY,
};

// Function to fetch products from Shopify
export async function getProducts() {
  try {
    if (!shopifyClient) {
      console.log('Shopify client not available, returning empty products array');
      return [];
    }
    
    if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
      console.error('Missing Shopify configuration');
      throw new Error('Missing Shopify configuration');
    }
    
    console.log('Fetching products from Shopify...');
    const response: any = await shopifyClient.request(PRODUCTS_QUERY);
    console.log('Raw Shopify response:', JSON.stringify(response, null, 2));

    // Check for GraphQL errors
    if (Array.isArray(response.errors) && response.errors.length > 0) {
      console.error('GraphQL Errors:', response.errors);
      throw new Error(response.errors[0]?.message || 'GraphQL Error occurred');
    }

    // Check for valid response structure
    if (!response?.data?.products?.edges) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response structure from Shopify');
    }
    
    const products = response.data.products.edges.map(({ node }: any) => {
      const product = node;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        product_type: product.productType,
        availableForSale: product.availableForSale,
        images: product.images.edges.map(({ node: img }: any) => ({
          id: img.id,
          src: img.url,
          alt: img.altText
        })),
        variants: product.variants.edges.map(({ node: variant }: any) => ({
          id: variant.id,
          title: variant.title,
          price: variant.price,
          availableForSale: variant.availableForSale,
          compareAtPrice: variant.compareAtPrice,
          selectedOptions: variant.selectedOptions
        }))
      };
    });

    console.log(`Successfully fetched ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Function to fetch collections from Shopify
export async function getCollections() {
  try {
    if (isBuildTime || !shopifyClient) {
      console.log('Build time or missing client, returning empty collections array');
      return [];
    }

    if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      throw new Error('Shopify Storefront Access Token is missing');
    }

    if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
      throw new Error('Shopify Store Domain is missing');
    }

    console.log('Attempting to fetch collections from Shopify...');
    const response = await shopifyClient.request(COLLECTIONS_QUERY);

    if (!response?.data?.collections?.edges) {
      throw new Error('Invalid response format from Shopify');
    }

    const collections = response.data.collections.edges.map((edge: any) => edge.node);
    console.log(`Successfully fetched ${collections.length} collections`);
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error; // Re-throw to be handled by the context
  }
}

// Function to fetch a product by handle
export async function getProductByHandle(handle: string) {
  try {
    if (isBuildTime || !shopifyClient) {
      return null;
    }
    
    const response = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, { handle } as any);
    return response.data.product;
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return null;
  }
}

// Function to create a checkout session
export async function createCheckout(variantId: string, quantity: number = 1) {
  try {
    if (isBuildTime || !shopifyClient) {
      return null;
    }
    
    const response = await shopifyClient.request(CREATE_CHECKOUT_MUTATION, {
      input: {
        lineItems: [
          {
            variantId,
            quantity,
          },
        ],
      },
    } as any);
    return response.data.checkoutCreate.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
} 
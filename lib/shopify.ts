import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Define types for our mock client
type MockShopifyClient = {
  query: (query: string, variables?: any) => Promise<any>;
  request: (query: string, variables?: any) => Promise<any>;
};

// Create the Shopify client with fallback values
const shopifyClient: any = isBuildTime 
  ? {
      // Mock client for build time
      query: async (query: string, variables?: any) => ({ data: { products: { edges: [] } } }),
      request: async (query: string, variables?: any) => ({ data: { products: { edges: [] } } }),
    }
  : createStorefrontApiClient({
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'eswivu-v8.myshopify.com',
      publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'dummy-token-for-build',
      apiVersion: '2024-07',
    });

// GraphQL queries
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

export {
  shopifyClient,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  CREATE_CHECKOUT_MUTATION,
};

// Function to fetch products from Shopify
export async function getProducts() {
  try {
    // If we're in build time and don't have a token, return empty data
    if (isBuildTime) {
      return [];
    }
    
    const response = await shopifyClient.request(PRODUCTS_QUERY);
    return response.data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to fetch collections from Shopify
export async function getCollections() {
  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2023-10/custom_collections.json`,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN || '',
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.custom_collections;
  } catch (error) {
    console.error('Error fetching collections from Shopify:', error);
    return [];
  }
}

// Function to fetch a product by handle
export async function getProductByHandle(handle: string) {
  try {
    // If we're in build time and don't have a token, return empty data
    if (isBuildTime) {
      return null;
    }
    
    const response = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
      handle,
    });
    return response.data.product;
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    return null;
  }
}

// Function to create a checkout session
export async function createCheckout(variantId: string, quantity: number = 1) {
  try {
    // If we're in build time and don't have a token, return empty data
    if (isBuildTime) {
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
    });
    return response.data.checkoutCreate.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
} 
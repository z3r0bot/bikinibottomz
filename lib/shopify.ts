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
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string,
      publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
      apiVersion: '2024-07',
    });

// Add debug logging
console.log('Shopify Configuration:', {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  isBuildTime,
});

// GraphQL queries
const PRODUCTS_QUERY = `
  query Products {
    products(first: 25, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          availableForSale
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
    if (isBuildTime) {
      console.log('Build time detected, returning empty products array');
      return [];
    }
    
    if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      throw new Error('Shopify Storefront Access Token is missing');
    }

    if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
      throw new Error('Shopify Store Domain is missing');
    }
    
    console.log('Attempting to fetch products from Shopify...');
    const response = await shopifyClient.request(PRODUCTS_QUERY);
    
    console.log('Shopify API Response:', JSON.stringify(response, null, 2));

    // Check for GraphQL errors
    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      throw new Error(response.errors.message || 'GraphQL Error occurred');
    }

    // Check for valid response structure
    if (!response?.data?.products?.edges) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response structure from Shopify');
    }
    
    const products = response.data.products.edges.map((edge: any) => {
      const product = edge.node;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        handle: product.handle,
        product_type: product.productType,
        availableForSale: product.availableForSale,
        images: product.images.edges.map((img: any) => ({
          id: img.node.id,
          src: img.node.url,
          alt: img.node.altText
        })),
        variants: product.variants.edges.map((variant: any) => ({
          id: variant.node.id,
          title: variant.node.title,
          price: variant.node.price,
          availableForSale: variant.node.availableForSale,
          compareAtPrice: variant.node.compareAtPrice
        }))
      };
    });

    console.log(`Successfully fetched ${products.length} products:`, products);
    return products;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Function to fetch collections from Shopify
export async function getCollections() {
  try {
    // If we're in build time and don't have a token, return empty data
    if (isBuildTime) {
      console.log('Build time detected, returning empty collections array');
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
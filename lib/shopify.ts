import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Create the Shopify client
const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY || '',
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
    const response = await fetch(
      `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2023-10/products.json`,
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
    return data.products;
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
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

// Function to create a checkout session
export async function createCheckout(variantId: string, quantity: number = 1) {
  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2023-10/checkouts.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkout: {
            line_items: [
              {
                variant_id: variantId,
                quantity: quantity,
              },
            ],
          },
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
} 
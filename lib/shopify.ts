import Client from 'shopify-buy';

// Initialize the Shopify client
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2023-10',
});

export default client; 
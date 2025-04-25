import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import type { ShopifyConfig, ShopifyClient } from './types';

if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN environment variable is not set');
}

if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY environment variable is not set');
}

const config: ShopifyConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_KEY,
  apiVersion: '2024-07',
};

export const shopifyClient: ShopifyClient = createStorefrontApiClient(config); 
import { StorefrontApiClient } from '@shopify/storefront-api-client';

export interface ShopifyConfig {
  storeDomain: string;
  publicAccessToken: string;
  apiVersion: string;
}

export interface ShopifyClient extends StorefrontApiClient {} 
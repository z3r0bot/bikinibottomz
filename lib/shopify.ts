import Client from 'shopify-buy';
import type { Product as ShopifyProduct, Collection as ShopifyCollection } from 'shopify-buy';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
  console.warn('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not defined');
}

if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.warn('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined');
}

// Initialize the Shopify client
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2023-10',
});

// Type definitions for our application
export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    id: string;
    title: string;
    price: string;
    availableForSale: boolean;
  }[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText: string;
  };
  products: Product[];
}

// Helper function to transform Shopify products to our Product interface
export function transformProduct(shopifyProduct: ShopifyProduct): Product {
  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    handle: shopifyProduct.handle,
    images: {
      edges: shopifyProduct.images.map(image => ({
        node: {
          url: image.src,
          altText: image.altText || shopifyProduct.title
        }
      }))
    },
    priceRange: {
      minVariantPrice: {
        amount: shopifyProduct.variants[0].price.amount.toString(),
        currencyCode: shopifyProduct.variants[0].price.currencyCode
      }
    },
    variants: shopifyProduct.variants.map(variant => ({
      id: variant.id,
      title: variant.title,
      price: variant.price.amount.toString(),
      availableForSale: variant.availableForSale
    }))
  };
}

// Helper function to transform Shopify collections
export function transformCollection(shopifyCollection: ShopifyCollection): Collection {
  return {
    id: shopifyCollection.id,
    title: shopifyCollection.title,
    handle: shopifyCollection.handle,
    description: shopifyCollection.description,
    image: shopifyCollection.image ? {
      url: shopifyCollection.image.src,
      altText: shopifyCollection.image.altText || shopifyCollection.title
    } : undefined,
    products: shopifyCollection.products.map(transformProduct)
  };
}

// API functions
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const products = await client.product.fetchAll();
    return products.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function fetchProductByHandle(handle: string): Promise<Product> {
  try {
    const product = await client.product.fetchByHandle(handle);
    return transformProduct(product);
  } catch (error) {
    console.error(`Error fetching product with handle ${handle}:`, error);
    throw new Error(`Failed to fetch product: ${handle}`);
  }
}

export async function fetchAllCollections(): Promise<Collection[]> {
  try {
    const collections = await client.collection.fetchAll();
    return collections.map(transformCollection);
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw new Error('Failed to fetch collections');
  }
}

export async function fetchCollectionByHandle(handle: string): Promise<Collection> {
  try {
    const collection = await client.collection.fetchByHandle(handle);
    return transformCollection(collection);
  } catch (error) {
    console.error(`Error fetching collection with handle ${handle}:`, error);
    throw new Error(`Failed to fetch collection: ${handle}`);
  }
}

export default client; 
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProducts, getCollections } from '../../lib/shopify';

// Define types for our Shopify data
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  product_type: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

export interface ShopifyVariant {
  id: string;
  price: string;
  title: string;
}

export interface ShopifyImage {
  id: string;
  src: string;
  alt: string | null;
}

export interface ShopifyCollection {
  id: number;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
}

// Define the context type
interface ShopifyContextType {
  products: ShopifyProduct[];
  collections: ShopifyCollection[];
  isLoading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  refreshCollections: () => Promise<void>;
}

// Create the context with default values
const ShopifyContext = createContext<ShopifyContextType>({
  products: [],
  collections: [],
  isLoading: true,
  error: null,
  refreshProducts: async () => {},
  refreshCollections: async () => {},
});

// Create a provider component
export function ShopifyProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch products
  const refreshProducts = async () => {
    try {
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch collections
  const refreshCollections = async () => {
    try {
      setIsLoading(true);
      const fetchedCollections = await getCollections();
      setCollections(fetchedCollections);
      setError(null);
    } catch (err) {
      setError('Failed to fetch collections');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([refreshProducts(), refreshCollections()]);
    };
    
    fetchData();
  }, []);

  // Provide the context value
  const value = {
    products,
    collections,
    isLoading,
    error,
    refreshProducts,
    refreshCollections,
  };

  return (
    <ShopifyContext.Provider value={value}>
      {children}
    </ShopifyContext.Provider>
  );
}

// Create a custom hook to use the Shopify context
export function useShopify() {
  const context = useContext(ShopifyContext);
  if (context === undefined) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
} 
export interface ShopifyImage {
  url: string;
  altText: string;
}

export interface ShopifyImageEdge {
  node: ShopifyImage;
}

export interface ShopifyImageConnection {
  edges: ShopifyImageEdge[];
}

export interface ShopifyVariant {
  id: string;
  price: string;
  title: string;
  availableForSale: boolean;
}

export interface ShopifyVariantEdge {
  node: ShopifyVariant;
}

export interface ShopifyVariantConnection {
  edges: ShopifyVariantEdge[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: ShopifyImageConnection;
  variants: ShopifyVariantConnection;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage;
  products: {
    edges: {
      node: Product;
    }[];
  };
} 
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
  title: string;
  description: string;
  handle: string;
  productType: string;
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        title: string;
      };
    }>;
  };
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
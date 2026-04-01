export interface Door {
  id: string;
  number: number;
  name: string;
  description: string;
  color: string;
  icon: string; // lucide icon name
}

export interface ArthausPiece {
  id: string;
  number: string;
  name: string;
  description: string;
  image: string;
  ctaText: string;
}

export interface PlaygroundItem {
  id: string;
  title: string;
  image: string;
}

export interface StudioImage {
  id: string;
  label: string;
  image: string;
}

// Re-export SDK types for convenience
export type {
  Product as SDKProduct,
  ProductListItem,
  Cart as SDKCart,
  CartItem as SDKCartItem,
  Category as SDKCategory,
  ShippingTier,
  ShippingAddress,
  CreateOrderData,
  CreateOrderResult,
  StoreConfig,
  StoreSettings,
  Order as SDKOrder,
} from "@mantaray-digital/store-sdk";


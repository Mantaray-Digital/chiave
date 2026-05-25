export interface Door {
  id: string;
  number: number;
  name: string;
  description: string;
  color: string;
  icon: string; // lucide icon name
  image: string;
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
  description: string;
}

export interface StudioImage {
  id: string;
  label: string;
  image: string;
  description: string;
}

export interface VisualArt {
  id: string;            // VA-01, VA-02, ...
  name: string;
  originalImage: string; // raw artwork (public/ path)
  portraitImage: string; // wall-portrait mockup (public/ path)
}

export interface Sculpture {
  id: string;            // CH-S01 .. CH-S54
  name: string;
  height: number;        // cm
  width?: number;        // cm (some pieces are vertical-only)
  colors: string;        // free-form (usually "All colors")
  priceEgp: number;
  priceNote?: string;    // "per one", "set for 40K", etc.
  inStock: boolean;
  description: string;
  images: string[];      // public/ paths, at least one
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
  CustomerProfile,
  CustomerAddress,
  LoginResult,
  RegisterResult,
  RegisterData,
  OrderListItem,
} from "@mantaray-digital/store-sdk";


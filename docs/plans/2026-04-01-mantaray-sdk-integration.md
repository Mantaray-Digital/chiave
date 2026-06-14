# Mantaray Store SDK Integration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all mock/hardcoded product data with live data from the Mantaray Store SDK, connecting the shop, cart, and checkout flows to the real backend.

**Architecture:** Install `@mantaray-digital/store-sdk`, create a singleton SDK client, build React hooks (using TanStack Query) to fetch products/categories/cart/shipping from the SDK, then swap every page that currently reads `MOCK_PRODUCTS` or uses the local Zustand cart to use the SDK instead. The Zustand cart store will be replaced by the SDK's server-side cart. Store config (currency, theme) will be fetched once at app level and made available via React context.

**Tech Stack:** Next.js 16, React 19, @mantaray-digital/store-sdk, @tanstack/react-query (already installed), Zustand (kept for UI-only state like toasts), TypeScript 5.

---

## Task 1: Install SDK & Configure Environment

**Files:**
- Create: `chiave-website/.env.local`
- Modify: `chiave-website/package.json` (via npm install)

**Step 1: Install the SDK**

Run:
```bash
cd chiave-website && npm install @mantaray-digital/store-sdk
```

**Step 2: Create `.env.local`**

```env
MANTARAY_API_KEY=mk_live_5oJ68AEy7H6BOKn1NanElkX5Sj0kZPYT
CONVEX_URL=https://fast-jaguar-540.convex.cloud
```

**Step 3: Add `.env.local` to `.gitignore` if not already there**

Check `.gitignore` and ensure `.env.local` is listed. Next.js gitignore templates typically include it.

**Step 4: Verify install**

Run:
```bash
cd chiave-website && npx tsc --noEmit 2>&1 | head -5
```
Expected: No errors related to the SDK import.

---

## Task 2: Create SDK Client Singleton

**Files:**
- Create: `src/lib/mantaray.ts`

**Step 1: Create the SDK client file**

```typescript
import { MantarayStore } from "@mantaray-digital/store-sdk";

// Singleton — reused across server & client
let storeInstance: MantarayStore | null = null;

export function getMantarayStore(): MantarayStore {
  if (!storeInstance) {
    storeInstance = new MantarayStore({
      apiKey: process.env.MANTARAY_API_KEY ?? process.env.NEXT_PUBLIC_MANTARAY_API_KEY ?? "",
      convexUrl: process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL ?? "",
    });
  }
  return storeInstance;
}
```

> **Note:** If the SDK needs to run client-side (for cart mutations), we may need `NEXT_PUBLIC_` prefixed env vars. Determine this during Task 3 based on whether the SDK works in the browser. If server-only is fine (Server Components + Server Actions), keep env vars private.

---

## Task 3: Create Store Config Context

**Files:**
- Create: `src/lib/store-config-context.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create the context + provider**

```typescript
"use client";

import { createContext, useContext, type ReactNode } from "react";

// Shape returned by store.store.getConfig()
export interface StoreConfig {
  settings: {
    currencySymbol: string;
    currencyPosition: "before" | "after";
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

const StoreConfigContext = createContext<StoreConfig | null>(null);

export function StoreConfigProvider({
  config,
  children,
}: {
  config: StoreConfig;
  children: ReactNode;
}) {
  return (
    <StoreConfigContext.Provider value={config}>
      {children}
    </StoreConfigContext.Provider>
  );
}

export function useStoreConfig(): StoreConfig {
  const ctx = useContext(StoreConfigContext);
  if (!ctx) throw new Error("useStoreConfig must be inside StoreConfigProvider");
  return ctx;
}
```

**Step 2: Create a server-side config fetcher & wrap layout**

In `src/app/layout.tsx`, fetch the store config in the server component and pass it to the client provider:

```typescript
// At the top of layout.tsx, add:
import { getMantarayStore } from "@/lib/mantaray";
import { StoreConfigProvider } from "@/lib/store-config-context";

// Inside RootLayout, before the return:
const store = getMantarayStore();
const config = await store.store.getConfig();

// Wrap {children} with:
<StoreConfigProvider config={config}>
  {children}
</StoreConfigProvider>
```

---

## Task 4: Create Currency Formatting Utility

**Files:**
- Create: `src/lib/format-price.ts`

**Step 1: Create the utility**

```typescript
import type { StoreConfig } from "@/lib/store-config-context";

export function formatPrice(amount: number, settings: StoreConfig["settings"]): string {
  const formatted = amount.toFixed(2);
  return settings.currencyPosition === "before"
    ? `${settings.currencySymbol}${formatted}`
    : `${formatted}${settings.currencySymbol}`;
}
```

This replaces the many `formatCurrency()` functions scattered across pages.

---

## Task 5: Update Product Types

**Files:**
- Modify: `src/types/index.ts`

**Step 1: Add SDK-compatible Product type**

Keep the existing `Product` type but add a new `SDKProduct` type that maps from the SDK response. Or, if the SDK exports its own types, import and re-export them:

```typescript
import type { Product as MantarayProduct } from "@mantaray-digital/store-sdk";

// Re-export for use throughout the app
export type SDKProduct = MantarayProduct;

// Keep the old Product type temporarily for reference, but we'll migrate away from it
```

The SDK product has: `_id`, `name`, `nameAr`, `description`, `descriptionAr`, `basePrice`, `compareAtPrice`, `images: string[]`, `hasVariants`, `options`, `variants`, `stock`, `isPreOrderEnabled`, `specifications`, `trustSignals`, `fitInfo`.

Key differences from current `Product`:
| Current | SDK |
|---------|-----|
| `id` | `_id` |
| `price` | `basePrice` |
| `image` (single string) | `images` (array) |
| `currency` | from store config |
| `category` (slug string) | fetched via categories API |
| `isBestSeller` | not in SDK — use collections or featured flag |
| `inStock` | `stock` (number or undefined) |

---

## Task 6: Create React Query Hooks for Products

**Files:**
- Create: `src/hooks/use-products.ts`

**Step 1: Set up React Query provider**

Create `src/lib/query-provider.tsx`:

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000 },
    },
  }));
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

Add `<QueryProvider>` wrapper in `layout.tsx`.

**Step 2: Create product hooks**

```typescript
import { useQuery } from "@tanstack/react-query";
import { getMantarayStore } from "@/lib/mantaray";

const store = getMantarayStore();

export function useProducts(options?: { categoryId?: string; sortBy?: string }) {
  return useQuery({
    queryKey: ["products", options],
    queryFn: () => store.products.list(options),
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => store.products.get(productId),
    enabled: !!productId,
  });
}
```

---

## Task 7: Create React Query Hooks for Categories

**Files:**
- Create: `src/hooks/use-categories.ts`

```typescript
import { useQuery } from "@tanstack/react-query";
import { getMantarayStore } from "@/lib/mantaray";

const store = getMantarayStore();

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => store.categories.list(),
  });
}
```

---

## Task 8: Create SDK Cart Hook (Replaces Zustand Cart)

**Files:**
- Create: `src/hooks/use-sdk-cart.ts`

**Step 1: Create the cart hook**

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMantarayStore } from "@/lib/mantaray";

const store = getMantarayStore();

export function useSDKCart() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ["cart"] });

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () => store.cart.get(),
  });

  const addItem = useMutation({
    mutationFn: (params: { productId: string; variantId?: string; quantity: number }) =>
      store.cart.addItem(params),
    onSuccess: invalidate,
  });

  const updateItem = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      store.cart.updateItem(itemId, quantity),
    onSuccess: invalidate,
  });

  const removeItem = useMutation({
    mutationFn: (itemId: string) => store.cart.removeItem(itemId),
    onSuccess: invalidate,
  });

  const clearCart = useMutation({
    mutationFn: () => store.cart.clear(),
    onSuccess: invalidate,
  });

  return {
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  };
}
```

---

## Task 9: Create Checkout/Shipping Hook

**Files:**
- Create: `src/hooks/use-checkout.ts`

```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { getMantarayStore } from "@/lib/mantaray";

const store = getMantarayStore();

export function useShippingTiers() {
  return useQuery({
    queryKey: ["shipping-tiers"],
    queryFn: () => store.checkout.getShippingTiers(),
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: (data: Parameters<typeof store.checkout.createOrder>[0]) =>
      store.checkout.createOrder(data),
  });
}
```

---

## Task 10: Update ProductCard Component

**Files:**
- Modify: `src/components/molecules/ProductCard.tsx`

**Changes:**
- Accept SDK product shape (`_id`, `basePrice`, `images[]`, `stock`)
- Use `useStoreConfig()` for currency formatting
- Use `useSDKCart().addItem` instead of Zustand `addItem`
- Handle `images[0]` instead of single `image`
- Handle `stock` number instead of boolean `inStock`
- Handle `compareAtPrice` for sale display

The component props change from `{ product: Product }` to accepting the SDK product type.

---

## Task 11: Update Shop Page (`/shop`)

**Files:**
- Modify: `src/app/shop/page.tsx`

**Changes:**
- Remove `MOCK_PRODUCTS` and `SHOP_CATEGORIES` imports
- This is a Server Component — fetch products and categories directly:
  ```typescript
  const store = getMantarayStore();
  const [{ products }, categories] = await Promise.all([
    store.products.list(),
    store.categories.list(),
  ]);
  ```
- Pass SDK products to `ShopBestSellers` and `ShopCategories`
- Update the "All Products" grid to use SDK product shape
- For "best sellers": use a collection or filter by a featured flag from the SDK

---

## Task 12: Update Product Detail Page (`/shop/[id]`)

**Files:**
- Modify: `src/app/shop/[id]/page.tsx`

**Changes:**
- Convert to use `useProduct(id)` hook instead of `MOCK_PRODUCTS.find()`
- Show loading state while product loads
- Display all `images[]` (gallery view)
- Use `basePrice` / `compareAtPrice` for pricing
- Use `stock` for availability
- Use SDK cart `addItem` mutation
- Display `specifications` and `trustSignals` if available
- For related products: fetch by same category using `useProducts({ categoryId })`

---

## Task 13: Update Cart Page (`/shop/cart`)

**Files:**
- Modify: `src/app/shop/cart/page.tsx`

**Changes:**
- Replace `useCartStore()` with `useSDKCart()`
- Cart items come from `cart.items` (SDK shape: `productId`, `name`, `price`, `quantity`, `imageUrl`)
- Use `updateItem.mutate()` / `removeItem.mutate()` for quantity changes
- Use `cart.subtotal` and `cart.itemCount` from SDK
- Shipping cost will come from shipping tiers (Task 9)

---

## Task 14: Update Checkout Page (`/shop/checkout`)

**Files:**
- Modify: `src/app/shop/checkout/page.tsx`

**Changes:**
- Use `useSDKCart()` for cart data
- Use `useShippingTiers()` to show real shipping options
- Use `useCreateOrder()` mutation for order placement
- Map the address form to SDK's `ShippingAddress` shape:
  ```typescript
  {
    name: `${firstName} ${lastName}`,
    phone,
    addressLine1: address,
    addressLine2: "",
    city,
    postalCode: zipCode
  }
  ```
- Select a shipping tier ID from the fetched tiers
- Remove hardcoded shipping cost logic

---

## Task 15: Update Order Confirmed Page

**Files:**
- Modify: `src/app/shop/order-confirmed/page.tsx`

**Changes:**
- The `createOrder` response contains an `orderId` — pass it via URL params or store in Zustand (temporary UI state)
- Display the order ID from the SDK response
- Remove dependency on the old Zustand `lastOrder` pattern
- Consider: store the order result in a lightweight Zustand store or pass via search params: `/shop/order-confirmed?orderId=xxx`

---

## Task 16: Update ShopBestSellers & ShopCategories Components

**Files:**
- Modify: `src/components/organisms/ShopBestSellers.tsx`
- Modify: `src/components/organisms/ShopCategories.tsx`

**Changes:**
- Update prop types to accept SDK product/category shapes
- `ShopCategories`: use `category._id` instead of `category.id`, `category.name`, `category.productCount`
- Filter products by `categoryId` match instead of slug
- `ShopBestSellers`: accept products directly (parent filters them)

---

## Task 17: Update Navbar Cart Badge

**Files:**
- Modify: `src/components/organisms/Navbar.tsx`

**Changes:**
- Replace `useCartStore().totalItems()` with `useSDKCart().cart?.itemCount`
- Handle loading state (show 0 while loading)

---

## Task 18: Clean Up Deprecated Code

**Files:**
- Modify: `src/lib/constants.ts` — Remove `MOCK_PRODUCTS` and `SHOP_CATEGORIES`
- Modify: `src/stores/cart.ts` — Remove the entire cart store (keep toast store)
- Modify: `src/types/index.ts` — Remove old `Product`, `CartItem`, `ProductCategory` types; keep non-shop types

---

## Task 19: Verify & Test End-to-End

**Step 1: Run the dev server**

```bash
cd chiave-website && npm run dev
```

**Step 2: Test each page**

1. `/shop` — Products load from SDK, categories display, best sellers show
2. `/shop/[id]` — Product detail loads, add to cart works
3. `/shop/cart` — Cart shows SDK cart items, quantity changes persist
4. `/shop/checkout` — Shipping tiers load, order placement works
5. `/shop/order-confirmed` — Order confirmation displays

**Step 3: Run build**

```bash
npm run build
```
Expected: No TypeScript errors, no build failures.

---

## Execution Order & Dependencies

```
Task 1 (install SDK)
  └→ Task 2 (SDK client)
       ├→ Task 3 (store config context)
       │    └→ Task 4 (format price utility)
       ├→ Task 5 (update types)
       ├→ Task 6 (product hooks)
       ├→ Task 7 (category hooks)
       ├→ Task 8 (cart hook)
       └→ Task 9 (checkout hook)
            ├→ Task 10 (ProductCard) — depends on 5, 8
            ├→ Task 11 (shop page) — depends on 6, 7, 10
            ├→ Task 12 (product detail) — depends on 6, 8, 10
            ├→ Task 13 (cart page) — depends on 8
            ├→ Task 14 (checkout page) — depends on 8, 9
            ├→ Task 15 (order confirmed) — depends on 14
            ├→ Task 16 (best sellers & categories) — depends on 5
            └→ Task 17 (navbar badge) — depends on 8
                 └→ Task 18 (cleanup) — after all above
                      └→ Task 19 (verify)
```

**Parallelizable groups:**
- Tasks 3-9 can largely be done in parallel after Task 2
- Tasks 10-17 can be done in parallel after their dependencies
- Tasks 18-19 must be last

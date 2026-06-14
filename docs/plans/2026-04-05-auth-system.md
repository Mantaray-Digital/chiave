# Authentication System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add user registration/login with dedicated pages, gated checkout, and cart persistence across auth transitions.

**Architecture:** Leverage the Mantaray SDK's built-in `useCustomer()` hook (login, register, logout, profile) and `store.setCustomer(customerId)` to link cart to authenticated users. Auth state persisted via localStorage. Checkout page requires authentication — unauthenticated users are redirected to login with a `redirect` query param that sends them back after authenticating.

**Tech Stack:** Next.js 16 App Router, Mantaray Store SDK (`useCustomer`, `useMantarayStore`), Zustand (auth persistence store), Tailwind CSS, Lucide icons.

---

### Task 1: Auth Zustand Store

**Files:**
- Create: `src/stores/auth-store.ts`

**Why:** The SDK's `useCustomer()` hook manages server-side auth state, but we need a client-side Zustand store to persist `customerId` and `customerName` in localStorage so the session survives page refreshes and we can call `store.setCustomer()` on app boot.

**Step 1: Create the auth persistence store**

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  customerId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  setCustomer: (id: string, name: string, email: string) => void;
  clearCustomer: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customerId: null,
      customerName: null,
      customerEmail: null,
      setCustomer: (id, name, email) =>
        set({ customerId: id, customerName: name, customerEmail: email }),
      clearCustomer: () =>
        set({ customerId: null, customerName: null, customerEmail: null }),
    }),
    { name: "chiave-auth" }
  )
);
```

**Step 2: Verify build compiles**

Run: `cd chiave-website && npx next build`
Expected: Build succeeds (store is not yet imported anywhere).

**Step 3: Commit**

```
feat: add auth persistence store with Zustand
```

---

### Task 2: Auth Session Restorer Component

**Files:**
- Create: `src/components/atoms/AuthRestorer.tsx`
- Modify: `src/app/layout.tsx`

**Why:** On page load, if a customerId is persisted in localStorage, we need to call `store.setCustomer(customerId)` so the Mantaray SDK links the cart, wishlist, etc. to the customer. This component lives inside MantarayProvider and runs once on mount.

**Step 1: Create the AuthRestorer component**

```typescript
"use client";

import { useEffect, useRef } from "react";
import { useMantarayStore } from "@mantaray-digital/store-sdk/react";
import { useAuthStore } from "@/stores/auth-store";

export function AuthRestorer() {
  const store = useMantarayStore();
  const customerId = useAuthStore((s) => s.customerId);
  const restored = useRef(false);

  useEffect(() => {
    if (customerId && !restored.current) {
      store.setCustomer(customerId);
      restored.current = true;
    }
  }, [customerId, store]);

  return null;
}
```

**Step 2: Add AuthRestorer to root layout**

In `src/app/layout.tsx`, import `AuthRestorer` and place it as the first child inside `<MantarayClientProvider>`:

```tsx
import { AuthRestorer } from "@/components/atoms/AuthRestorer";

// Inside the provider tree:
<MantarayClientProvider>
  <AuthRestorer />
  <CartToastProvider>
    ...
  </CartToastProvider>
</MantarayClientProvider>
```

**Step 3: Verify build**

Run: `cd chiave-website && npx next build`
Expected: Build succeeds.

**Step 4: Commit**

```
feat: add AuthRestorer to restore customer session on page load
```

---

### Task 3: Login Page

**Files:**
- Create: `src/app/account/login/page.tsx`

**Why:** Dedicated login page matching the dark luxury Chiave aesthetic. Accepts `?redirect=` query param so checkout can redirect here and bounce back after login.

**Step 1: Create the login page**

The page should:
- Be a `"use client"` component
- Use `useCustomer()` from the SDK for `login()` function
- Use `useAuthStore` to persist customer data after login
- Use `useMantarayStore()` to call `store.setCustomer()` after login
- Read `redirect` search param from URL (via `useSearchParams()`)
- After successful login: persist to auth store, call `store.setCustomer()`, redirect to the `redirect` param or `/account`
- Show email + password fields
- Link to register page (preserving redirect param)
- Match Chiave design: dark bg (#0a0a0a), gold accents (#c8a96e), display font for headings, body font for inputs
- Show loading state on submit, error messages on failure
- If already logged in (check `useAuthStore`), redirect to `/account`

**Design reference — input style (from checkout page):**
```
w-full border border-[#2a2a2a] bg-transparent px-4 py-3 text-sm text-[#e8e2d8] outline-none transition-colors placeholder:text-[#4a4a4a] focus:border-[#c8a96e]
```

**Design reference — button style:**
```
w-full bg-[#c8a96e] py-3.5 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition-colors hover:bg-[#b8994e]
```

**Step 2: Verify by running dev server and navigating to `/account/login`**

Run: `cd chiave-website && npx next dev`
Navigate to: `http://localhost:3000/account/login`
Expected: Login form renders with Chiave styling.

**Step 3: Commit**

```
feat: add login page with redirect support
```

---

### Task 4: Register Page

**Files:**
- Create: `src/app/account/register/page.tsx`

**Why:** Registration page for new customers. Same flow as login — register, persist, link cart, redirect back.

**Step 1: Create the register page**

The page should:
- Be a `"use client"` component
- Use `useCustomer()` for `register()` function
- Fields: name, email, phone (optional), password, confirm password
- Client-side validation: passwords match, email format, required fields
- After successful registration: auto-login the user (call `login()` with the same credentials), persist to auth store, call `store.setCustomer()`, redirect
- Read `redirect` search param, same as login
- Link to login page (preserving redirect param)
- Match Chiave design exactly like the login page

**Important:** The SDK `register()` returns `{ customerId, name, email }` but doesn't auto-login. After register, call `login(email, password)` to get the full `LoginResult`, then persist.

**Step 2: Verify by navigating to `/account/register`**

**Step 3: Commit**

```
feat: add register page with auto-login after registration
```

---

### Task 5: Account Dashboard Page

**Files:**
- Create: `src/app/account/page.tsx`

**Why:** Logged-in users need a place to see their profile info and order history. Also serves as the default redirect after login.

**Step 1: Create the account page**

The page should:
- Be a `"use client"` component
- Use `useAuthStore` to check if logged in — if not, redirect to `/account/login`
- Use `useCustomer()` to get `profile` and `logout`
- Use `useOrders(customerId)` to list order history
- Display sections:
  1. Welcome header with customer name
  2. Profile info (name, email, phone) — read-only for now
  3. Order history list (order number, date, total, status) — or empty state
  4. Logout button
- On logout: call `logout()`, call `useAuthStore.clearCustomer()`, call `store.clearCustomer()`, redirect to `/`
- Match Chiave dark luxury design

**Step 2: Verify by navigating to `/account` while logged in**

**Step 3: Commit**

```
feat: add account dashboard with profile and order history
```

---

### Task 6: Add Auth Links to Navbar

**Files:**
- Modify: `src/components/organisms/Navbar.tsx`

**Why:** Users need to access login/account from the navbar. Show a user icon next to the cart icon — links to `/account/login` when logged out, `/account` when logged in.

**Step 1: Update the Navbar**

Changes:
- Import `useAuthStore` from `@/stores/auth-store`
- Import `User` icon from `lucide-react`
- Read `customerId` from auth store
- Add a user icon button next to the cart icon (both desktop and mobile sections)
- When logged out: links to `/account/login`
- When logged in: links to `/account`
- Style: same as cart icon (white, same size, same spacing)

Place the user icon **before** the cart icon in both desktop and mobile layouts.

**Step 2: Verify navbar shows user icon**

**Step 3: Commit**

```
feat: add auth link to navbar with conditional routing
```

---

### Task 7: Gate Checkout Behind Auth

**Files:**
- Modify: `src/app/shop/checkout/page.tsx`

**Why:** The core requirement — users must be logged in to checkout. If not logged in, redirect to login. After login, they return to checkout with cart intact.

**Step 1: Add auth gate to checkout page**

Changes at the top of the `CheckoutPage` component:
- Import `useAuthStore` from `@/stores/auth-store`
- Import `useRouter` (already imported)
- Read `customerId` from auth store
- Add a `useEffect` that redirects to `/account/login?redirect=/shop/checkout` if `customerId` is null
- Show a loading spinner while checking auth state (to avoid flash)
- In `handlePlaceOrder`, use `customerId` from auth store instead of `store.customer.getCurrentCustomerId() ?? "guest"`

**Step 2: Verify checkout redirects to login when not authenticated**

**Step 3: Verify login redirects back to checkout with cart intact**

**Step 4: Commit**

```
feat: gate checkout behind authentication with redirect flow
```

---

### Task 8: Re-export Auth Types & Final Wiring

**Files:**
- Modify: `src/types/index.ts`

**Step 1: Add auth-related type re-exports**

```typescript
export type {
  CustomerProfile,
  CustomerAddress,
  LoginResult,
  RegisterResult,
  RegisterData,
  OrderListItem,
} from "@mantaray-digital/store-sdk";
```

**Step 2: Full flow smoke test**

Test the complete flow:
1. Browse shop, add items to cart
2. Click "Proceed to Checkout"
3. Get redirected to `/account/login?redirect=/shop/checkout`
4. Click "Create Account" → register
5. Auto-redirected back to `/shop/checkout`
6. Cart items are still there
7. Fill shipping info, place order
8. Order confirmed page shows
9. Navigate to `/account` → see order in history
10. Logout → redirected to home
11. Navbar shows login icon again

**Step 3: Final build check**

Run: `cd chiave-website && npx next build`
Expected: Build succeeds with no errors.

**Step 4: Commit**

```
feat: add auth type re-exports and finalize auth system
```

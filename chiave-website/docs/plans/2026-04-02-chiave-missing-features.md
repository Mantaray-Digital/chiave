# Chiave — Missing Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete all missing production features for the Chiave website so it can launch as a fully functional e-commerce and portfolio site.

**Architecture:** Each feature is an independent vertical slice — contact form backend, payment integration, SEO metadata, product image gallery, error handling, and search/filtering. Tasks are ordered by launch priority: critical blockers first, then production readiness, then enhancements.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Mantaray Store SDK, Zustand, TanStack React Query, ShadCN UI

---

## Phase 1: Critical Launch Blockers

These features must be complete before the site can accept real customers.

---

### Task 1: Contact Form — API Route

**Files:**
- Create: `src/app/api/contact/route.ts`

**Step 1: Create the API route**

```typescript
import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  brand?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // TODO Task 2: Replace with real email service (Resend, SendGrid, etc.)
    console.log("Contact form submission:", body);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}
```

**Step 2: Verify the route starts**

Run: `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","message":"Hello"}'`
Expected: `{"success":true}`

**Step 3: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add contact form API route with validation"
```

---

### Task 2: Contact Form — Email Service Integration

**Files:**
- Modify: `src/app/api/contact/route.ts` (replace console.log with real send)
- Modify: `.env.local` (add email service keys)

**Step 1: Install Resend**

Run: `npm install resend`

**Step 2: Add environment variable**

Add to `.env.local`:
```
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=hello@chiave.com
```

**Step 3: Update the API route to send email**

Replace the `console.log` block in `src/app/api/contact/route.ts` with:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Inside the POST handler, replace console.log with:
await resend.emails.send({
  from: "Chiave Website <noreply@chiave.com>",
  to: process.env.CONTACT_EMAIL!,
  replyTo: body.email,
  subject: `[Chiave Contact] ${body.subject || "New Inquiry"} — ${body.name}`,
  text: [
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    body.brand ? `Brand: ${body.brand}` : null,
    body.subject ? `Subject: ${body.subject}` : null,
    `\nMessage:\n${body.message}`,
  ]
    .filter(Boolean)
    .join("\n"),
});
```

**Step 4: Commit**

```bash
git add src/app/api/contact/route.ts package.json package-lock.json
git commit -m "feat: integrate Resend email service for contact form"
```

---

### Task 3: Contact Form — Wire Up Frontend Submission

**Files:**
- Modify: `src/components/organisms/ContactForm.tsx`

**Step 1: Implement form submission with loading/error/success states**

Replace the current `ContactForm` component. Key changes:
- Add `useState` for `status` (`"idle"` | `"loading"` | `"success"` | `"error"`)
- Add `useState` for `errorMessage`
- In `handleSubmit`:
  - Set status to `"loading"`
  - `fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })`
  - On success: set status to `"success"`, reset form
  - On error: set status to `"error"`, show error message
- Disable submit button while loading
- Show success message after submission
- Show error message on failure

**Step 2: Test manually**

- Fill and submit the form
- Verify loading state appears
- Verify success message appears
- Verify form fields reset after success

**Step 3: Commit**

```bash
git add src/components/organisms/ContactForm.tsx
git commit -m "feat: wire contact form to API with loading and feedback states"
```

---

### Task 4: Payment Gateway — Stripe Setup

**Files:**
- Create: `src/app/api/checkout/create-payment-intent/route.ts`
- Modify: `.env.local` (add Stripe keys)

**Step 1: Install Stripe**

Run: `npm install stripe`

**Step 2: Add environment variables**

Add to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**Step 3: Create payment intent API route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "egp", metadata } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents/piastres
      currency,
      metadata: metadata || {},
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
```

**Step 4: Commit**

```bash
git add src/app/api/checkout/create-payment-intent/route.ts
git commit -m "feat: add Stripe payment intent API route"
```

---

### Task 5: Payment Gateway — Checkout Page Integration

**Files:**
- Modify: `src/app/shop/checkout/page.tsx`

**Step 1: Install Stripe React**

Run: `npm install @stripe/stripe-js @stripe/react-stripe-js`

**Step 2: Update the checkout page**

Key changes to `src/app/shop/checkout/page.tsx`:
- Import `loadStripe` from `@stripe/stripe-js` and `Elements`, `CardElement`, `useStripe`, `useElements` from `@stripe/react-stripe-js`
- Initialize Stripe: `const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)`
- When payment method is `"card"`:
  - Wrap the card input section in `<Elements stripe={stripePromise}>`
  - Replace the placeholder card inputs with `<CardElement />` from Stripe
- In `handlePlaceOrder`:
  - If payment method is `"card"`:
    - Call `/api/checkout/create-payment-intent` to get clientSecret
    - Call `stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } })`
    - On success: proceed to create order via SDK and redirect
    - On failure: show error message
  - If payment method is `"bank"` or `"cod"`: proceed as-is (no payment processing needed)

**Step 3: Test with Stripe test card**

- Use card number `4242 4242 4242 4242`, any future date, any CVC
- Verify payment intent is created
- Verify order flow completes

**Step 4: Commit**

```bash
git add src/app/shop/checkout/page.tsx package.json package-lock.json
git commit -m "feat: integrate Stripe payment into checkout flow"
```

---

### Task 6: Order Confirmation Email

**Files:**
- Create: `src/app/api/orders/send-confirmation/route.ts`
- Modify: `src/app/shop/checkout/page.tsx` (call email API after order creation)

**Step 1: Create the email API route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, orderNumber, total, items, shippingAddress } = await req.json();

    if (!email || !orderNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const itemsList = items
      .map((item: { name: string; quantity: number; price: number }) =>
        `  - ${item.name} x${item.quantity} — ${item.price}`
      )
      .join("\n");

    await resend.emails.send({
      from: "Chiave <orders@chiave.com>",
      to: email,
      subject: `Order Confirmed — #${orderNumber}`,
      text: [
        `Thank you for your order!`,
        ``,
        `Order Number: #${orderNumber}`,
        `Total: ${total}`,
        ``,
        `Items:`,
        itemsList,
        ``,
        `Shipping to:`,
        `${shippingAddress.name}`,
        `${shippingAddress.address}`,
        `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`,
        ``,
        `We'll notify you when your order ships.`,
        ``,
        `— Chiave`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
```

**Step 2: Call email API from checkout after order creation**

In `src/app/shop/checkout/page.tsx`, after the `store.checkout.createOrder()` call succeeds, add:

```typescript
// Fire-and-forget — don't block redirect on email
fetch("/api/orders/send-confirmation", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: shipping.email,
    orderNumber: result.orderNumber,
    total: formatPrice(result.total, storeConfig),
    items: cart.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: formatPrice(item.price * item.quantity, storeConfig),
    })),
    shippingAddress: {
      name: `${shipping.firstName} ${shipping.lastName}`,
      address: shipping.address,
      city: shipping.city,
      state: shipping.state,
      zipCode: shipping.zipCode,
    },
  }),
});
```

**Step 3: Commit**

```bash
git add src/app/api/orders/send-confirmation/route.ts src/app/shop/checkout/page.tsx
git commit -m "feat: send order confirmation email after checkout"
```

---

## Phase 2: Production Readiness

These features are needed for a professional, production-quality site.

---

### Task 7: SEO Metadata — All Pages

**Files:**
- Modify: `src/app/layout.tsx` (enhance root metadata)
- Modify: `src/app/page.tsx` (add metadata — requires converting to have a separate metadata export or using `generateMetadata`)
- Modify: `src/app/studio/page.tsx` (add metadata export)
- Modify: `src/app/playground/page.tsx` (add metadata export)
- Modify: `src/app/shop/page.tsx` (add `generateMetadata` — client component needs workaround)
- Modify: `src/app/shop/[id]/page.tsx` (add dynamic `generateMetadata`)

**Step 1: Enhance root layout metadata**

In `src/app/layout.tsx`, expand the metadata object (lines 26-30):

```typescript
export const metadata: Metadata = {
  title: {
    default: "Chiave — Unlock Creative Vision",
    template: "%s — Chiave",
  },
  description:
    "Chiave is a design studio exploring seven creative disciplines — sculptures, visual arts, art pieces, 3D printing, scenes, characters, and animation.",
  keywords: ["Chiave", "design studio", "art", "sculptures", "3D printing", "Egypt"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Chiave",
  },
};
```

**Step 2: Add metadata to server-rendered pages**

`src/app/studio/page.tsx` — add before the component:
```typescript
export const metadata: Metadata = {
  title: "Studio",
  description: "Explore seven creative disciplines through Chiave's studio portfolio.",
};
```

`src/app/playground/page.tsx` — add before the component:
```typescript
export const metadata: Metadata = {
  title: "Playground",
  description: "Experimental and in-progress work from the Chiave studio.",
};
```

**Step 3: Handle client-component pages (shop)**

For `src/app/shop/page.tsx` and `src/app/shop/[id]/page.tsx`, metadata cannot be exported from client components. Options:
- Extract a thin server-component wrapper (e.g., `src/app/shop/page-server.tsx`) that exports metadata and renders the client component, OR
- Create a `layout.tsx` for `/shop` that provides metadata for the shop section

Recommended approach: Add metadata to `src/app/shop/layout.tsx`:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse and shop curated art pieces, sculptures, and design objects from Chiave.",
};
```

For dynamic product pages (`/shop/[id]`), create a server-component wrapper that fetches the product name for the title using `generateMetadata`.

**Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/studio/page.tsx src/app/playground/page.tsx src/app/shop/layout.tsx
git commit -m "feat: add SEO metadata to all pages"
```

---

### Task 8: Product Image Gallery / Carousel

**Files:**
- Modify: `src/app/shop/[id]/page.tsx` (lines ~98-131, replace single image with gallery)

**Step 1: Build the image gallery into the product detail page**

In `src/app/shop/[id]/page.tsx`, replace the single image display with:
- A main image display (large)
- A thumbnail strip below showing all `product.images`
- Clicking a thumbnail sets it as the main image
- Add state: `const [selectedImage, setSelectedImage] = useState(0)`
- Optionally integrate the existing `Lightbox` component (`src/components/atoms/Lightbox.tsx`) for fullscreen viewing on click

**Step 2: Test with a product that has multiple images**

- Navigate to a product detail page
- Verify all images appear as thumbnails
- Verify clicking a thumbnail updates the main image
- Verify lightbox opens on main image click

**Step 3: Commit**

```bash
git add src/app/shop/[id]/page.tsx
git commit -m "feat: add product image gallery with thumbnails and lightbox"
```

---

### Task 9: Error Boundaries

**Files:**
- Create: `src/components/atoms/ErrorBoundary.tsx`
- Modify: `src/app/shop/page.tsx` (wrap product grid in error boundary)
- Modify: `src/app/shop/[id]/page.tsx` (wrap product detail in error boundary)
- Create: `src/app/error.tsx` (global error page)
- Create: `src/app/not-found.tsx` (custom 404 page)

**Step 1: Create a reusable error fallback component**

`src/components/atoms/ErrorBoundary.tsx`:
```typescript
"use client";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2
        className="text-2xl text-chiave-cream mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <p className="text-chiave-warm mb-8 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="border border-chiave-gold text-chiave-gold px-6 py-2 hover:bg-chiave-gold hover:text-chiave-black transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
```

**Step 2: Create global error page**

`src/app/error.tsx`:
```typescript
"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-chiave-black flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-4xl text-chiave-cream mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Something went wrong
        </h1>
        <p className="text-chiave-warm mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="border border-chiave-gold text-chiave-gold px-8 py-3 hover:bg-chiave-gold hover:text-chiave-black transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
```

**Step 3: Create custom 404 page**

`src/app/not-found.tsx`:
```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-chiave-black flex items-center justify-center">
      <div className="text-center">
        <h1
          className="text-6xl text-chiave-gold mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <p className="text-chiave-cream text-xl mb-2">Page not found</p>
        <p className="text-chiave-warm mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="border border-chiave-gold text-chiave-gold px-8 py-3 hover:bg-chiave-gold hover:text-chiave-black transition-colors inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
```

**Step 4: Add error handling to shop pages**

In `src/app/shop/page.tsx` and `src/app/shop/[id]/page.tsx`, check for error states from SDK hooks and render the `ErrorFallback` component when data fetching fails.

**Step 5: Commit**

```bash
git add src/components/atoms/ErrorBoundary.tsx src/app/error.tsx src/app/not-found.tsx src/app/shop/page.tsx src/app/shop/[id]/page.tsx
git commit -m "feat: add error boundaries, 404 page, and error fallbacks"
```

---

## Phase 3: Enhanced User Experience

These features improve the shopping experience but are not strict launch blockers.

---

### Task 10: Product Search

**Files:**
- Create: `src/components/molecules/SearchBar.tsx`
- Modify: `src/app/shop/page.tsx` (add search bar above product grid, filter products by query)

**Step 1: Create the SearchBar component**

```typescript
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search products..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-chiave-warm" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-chiave-dark text-chiave-cream placeholder:text-chiave-mid focus:border-chiave-gold focus:outline-none transition-colors"
        style={{ fontFamily: "var(--font-body)" }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-chiave-warm hover:text-chiave-cream"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

**Step 2: Integrate into shop page**

In `src/app/shop/page.tsx`:
- Add `const [searchQuery, setSearchQuery] = useState("")`
- Filter the `allProducts` array: `products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))`
- Render `<SearchBar>` above the "All Products" grid
- Show "No products found" when filter returns empty

**Step 3: Commit**

```bash
git add src/components/molecules/SearchBar.tsx src/app/shop/page.tsx
git commit -m "feat: add product search to shop page"
```

---

### Task 11: Category Filtering on Shop Page

**Files:**
- Modify: `src/app/shop/page.tsx` (add category filter tabs/buttons above product grid)

**Step 1: Add category filter state and UI**

In `src/app/shop/page.tsx`:
- Add `const [activeCategory, setActiveCategory] = useState<string | null>(null)`
- Render category filter buttons (pill/tag style) using the `categories` array from `useCategories()`
- Include an "All" button that sets `activeCategory` to `null`
- Filter products: `activeCategory ? products.filter(p => p.category?.name === activeCategory) : products`
- Combine with search filter from Task 10

**Step 2: Test**

- Click category buttons and verify product grid filters
- Verify "All" button shows everything
- Verify search + category filter work together

**Step 3: Commit**

```bash
git add src/app/shop/page.tsx
git commit -m "feat: add category filtering to shop page"
```

---

### Task 12: User Authentication — Login/Register Pages

**Files:**
- Create: `src/app/auth/login/page.tsx`
- Create: `src/app/auth/register/page.tsx`
- Create: `src/app/account/page.tsx` (order history / profile)
- Modify: `src/components/organisms/Navbar.tsx` (add account icon/link)

**Step 1: Determine auth strategy**

Check if Mantaray Store SDK provides customer authentication hooks. If yes, use those. If not, consider:
- NextAuth.js with credentials provider
- Clerk for managed auth
- Custom JWT-based auth

**Step 2: Build login page**

Create `src/app/auth/login/page.tsx` with:
- Email + password fields
- Submit handler calling auth provider
- Link to register page
- Styled consistent with Chiave dark theme

**Step 3: Build register page**

Create `src/app/auth/register/page.tsx` with:
- Name, email, password, confirm password fields
- Submit handler calling auth provider
- Link to login page

**Step 4: Build account page**

Create `src/app/account/page.tsx` with:
- Profile information display
- Order history list (fetched from SDK or backend)
- Logout button

**Step 5: Update navbar**

In `src/components/organisms/Navbar.tsx`:
- Add a user icon (from Lucide) next to the cart icon
- If logged in: link to `/account`
- If not logged in: link to `/auth/login`

**Step 6: Update checkout to use customer ID**

In `src/app/shop/checkout/page.tsx`:
- If user is authenticated, pass their customer ID to `createOrder()` instead of `"guest"`
- Pre-fill shipping form with saved address if available

**Step 7: Commit**

```bash
git add src/app/auth/ src/app/account/ src/components/organisms/Navbar.tsx src/app/shop/checkout/page.tsx
git commit -m "feat: add user authentication with login, register, and account pages"
```

---

### Task 13: Analytics Integration

**Files:**
- Create: `src/components/atoms/Analytics.tsx`
- Modify: `src/app/layout.tsx` (add analytics component)

**Step 1: Add Google Analytics**

Create `src/components/atoms/Analytics.tsx`:
```typescript
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
```

**Step 2: Add to root layout**

In `src/app/layout.tsx`, import and render `<Analytics />` inside the `<body>`.

**Step 3: Add environment variable**

Add to `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Step 4: Commit**

```bash
git add src/components/atoms/Analytics.tsx src/app/layout.tsx
git commit -m "feat: add Google Analytics integration"
```

---

## Phase 4: Testing

No tests currently exist in the project. This phase establishes a testing foundation.

---

### Task 14: Testing Setup

**Files:**
- Modify: `package.json` (add test scripts and devDependencies)
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

**Step 1: Install testing dependencies**

Run: `npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom`

**Step 2: Create Vitest config**

`vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 3: Create test setup file**

`src/test/setup.ts`:
```typescript
import "@testing-library/jest-dom/vitest";
```

**Step 4: Add test script to package.json**

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

**Step 5: Commit**

```bash
git add vitest.config.ts src/test/setup.ts package.json package-lock.json
git commit -m "chore: set up Vitest with React Testing Library"
```

---

### Task 15: Component Tests — Contact Form

**Files:**
- Create: `src/components/organisms/__tests__/ContactForm.test.tsx`

**Step 1: Write tests**

Test cases:
- Renders all form fields (name, email, subject, brand, message)
- Submit button is present and labeled "Send Inquiry"
- Shows validation if required fields are empty (if validation is implemented)
- Shows loading state during submission
- Shows success message after successful submission
- Shows error message on failed submission

**Step 2: Run tests**

Run: `npm test`
Expected: All tests pass

**Step 3: Commit**

```bash
git add src/components/organisms/__tests__/ContactForm.test.tsx
git commit -m "test: add contact form component tests"
```

---

### Task 16: Component Tests — ProductCard

**Files:**
- Create: `src/components/molecules/__tests__/ProductCard.test.tsx`

**Step 1: Write tests**

Test cases:
- Renders product name
- Renders product price
- Renders discount badge when `compareAtPrice` exists
- Renders product image
- "View" button links to `/shop/[id]`

**Step 2: Run tests**

Run: `npm test`
Expected: All tests pass

**Step 3: Commit**

```bash
git add src/components/molecules/__tests__/ProductCard.test.tsx
git commit -m "test: add ProductCard component tests"
```

---

### Task 17: E2E Test Setup (Optional)

**Files:**
- Create: `e2e/shop-flow.spec.ts`
- Create: `playwright.config.ts`

**Step 1: Install Playwright**

Run: `npm install -D @playwright/test && npx playwright install`

**Step 2: Create Playwright config**

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
  },
});
```

**Step 3: Write basic shop flow E2E test**

Test: Navigate to shop → click a product → add to cart → go to cart → verify item is there

**Step 4: Run E2E tests**

Run: `npx playwright test`

**Step 5: Commit**

```bash
git add e2e/ playwright.config.ts package.json package-lock.json
git commit -m "test: add Playwright E2E test for shop flow"
```

---

## Summary & Task Dependencies

```
Phase 1 (Critical)          Phase 2 (Production)        Phase 3 (UX)           Phase 4 (Testing)
─────────────────          ──────────────────────       ────────────           ─────────────────
Task 1: Contact API    ──→ Task 7: SEO Metadata        Task 10: Search        Task 14: Test Setup
Task 2: Email Service  ──→ Task 8: Image Gallery       Task 11: Filters       Task 15: Form Tests
Task 3: Form Frontend  ──→ Task 9: Error Boundaries    Task 12: Auth          Task 16: Card Tests
Task 4: Stripe Setup                                   Task 13: Analytics     Task 17: E2E Tests
Task 5: Stripe Checkout
Task 6: Order Emails
```

**Dependencies:**
- Task 2 depends on Task 1 (contact API must exist before email integration)
- Task 3 depends on Task 1 (frontend needs API endpoint)
- Task 5 depends on Task 4 (checkout needs Stripe setup)
- Task 6 depends on Task 2 (order emails reuse Resend setup)
- Task 11 can be combined with Task 10 (both modify shop page)
- Tasks 15-17 depend on Task 14 (testing setup)
- All phases are otherwise independent and can run in parallel

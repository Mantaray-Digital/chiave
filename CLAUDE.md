# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## ⚠️ Next.js 16.2.1 is modified — read the bundled docs first

`AGENTS.md` (above) is not boilerplate. This project runs Next.js **16.2.1**, which is newer than your training data and has breaking changes from what you know. **Before writing any Next.js code, read the relevant guide under `node_modules/next/dist/docs/`** (`01-app/` for App Router). Concrete things already in play here:

- **`params` is a `Promise`** in pages/layouts/`generateMetadata` — you must `await` it (see [src/app/sculptures/[id]/page.tsx](src/app/sculptures/[id]/page.tsx)).
- There is an **`unstable_instant` route export** for instant client-side navigation (mentioned in `node_modules/next/dist/docs/index.md`). If you touch navigation perf, read `docs/01-app/02-guides/instant-navigation.mdx` — `Suspense` alone is not enough.

Do not assume an API matches your memory; verify against the bundled docs.

## Commands

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint (next core-web-vitals + typescript)
npm run test         # vitest run (unit + component, happy-dom)
npm run test:watch   # vitest watch
npm run test:e2e     # playwright e2e (auto-starts `npm run dev`)
```

Run a single test: `npx vitest run src/components/molecules/__tests__/ProductCard.test.tsx`
Run one e2e test: `npx playwright test e2e/shop-flow.spec.ts -g "add item to cart"`

Node >= 20.9. The `@` path alias maps to `src/` (configured in both `tsconfig.json` and `vitest.config.ts`).

## Big picture

Chiave is a design-studio website built around **seven creative "doors"** (disciplines: Sculptures, Visual Arts, Art Pieces, 3D Printing, Scenes, Characters, Animations — see `DOORS` in [src/lib/constants.ts](src/lib/constants.ts)) plus a full e-commerce shop. The codebase has **two distinct halves with two different data sources**:

### 1. Editorial / portfolio content — static, hardcoded in TypeScript
Sculptures, visual arts, studio, playground, arthaus, characters, and the doors are **hardcoded data** in `src/lib/*.ts` (`sculptures.ts`, `visual-arts.ts`, `constants.ts`) paired with static images in `public/images/` (~800 tracked image files). These pages are **Server Components** that use `generateStaticParams` + `generateMetadata` and read from the lib data (e.g. `getSculptureById`). Sculpture prices live in the data as raw EGP numbers — they are unrelated to the shop's currency system.

### 2. Shop / e-commerce — live data via the Mantaray Store SDK
Everything under `/shop`, `/account`, and the cart/checkout flow is powered by **`@mantaray-digital/store-sdk`** (a Convex-backed e-commerce backend). See `sdk.md` for the full SDK API reference.

**Use the SDK's own React hooks** from `@mantaray-digital/store-sdk/react` — do *not* write custom TanStack Query hooks. (An older plan in `docs/plans/` describes building `src/hooks/use-*.ts` with TanStack Query; that approach was **not** taken and `src/hooks/` does not exist. `@tanstack/react-query` remains a dependency but the SDK provides its own hooks.)

- `MantarayClientProvider` ([src/lib/mantaray-provider.tsx](src/lib/mantaray-provider.tsx)) wraps the app in [src/app/layout.tsx](src/app/layout.tsx) with `persistSession`.
- Client components read state with `useProducts`, `useCategories`, `useCart`, `useStoreConfig`, `useShippingTiers`, `useCustomer`.
- Imperative actions go through `useMantarayStore()` → e.g. `store.checkout.createOrder(...)`, `store.shipping.calculateCost(tier, subtotal)`, `store.setCustomer(id)`.
- [src/lib/mantaray.ts](src/lib/mantaray.ts) exposes `getMantarayStore()`, a server-side singleton SDK client. **It currently has no callers** (leftover from the superseded integration plan) — server-side SDK access is not yet an established pattern here. If you need the SDK on the server, this is the entry point, but check whether a client hook fits first.

### Auth (hybrid SDK + Zustand)
Customer auth combines the SDK with a persisted Zustand store:
- `useCustomer().login()` / `.register()` authenticate against the SDK and return `{ customerId, name, email }`.
- Identity is persisted in [src/stores/auth-store.ts](src/stores/auth-store.ts) (`useAuthStore`, localStorage key `chiave-auth`).
- After login you must call **both** `store.setCustomer(customerId)` (links the SDK session to the cart) **and** `setCustomer(...)` on the Zustand store.
- [AuthRestorer](src/components/atoms/AuthRestorer.tsx) re-links the SDK session from persisted Zustand state on every page load.
- Always gate auth-dependent UI with `useAuthHydrated()` to avoid SSR/hydration mismatches before reading `customerId`. Checkout is auth-gated and redirects unauthenticated users to `/account/login?redirect=...`.
- `getSafeRedirect()` sanitizes `?redirect=` params; `friendlyAuthError()` unwraps Convex's verbose `[Request ID: ...] ... CODE: message` error envelope into a clean message.

### Currency
Never hardcode shop currency. Use `formatPrice(amount, settings)` from [src/lib/format-price.ts](src/lib/format-price.ts), where `settings` comes from `useStoreConfig().data.settings` (`currencySymbol` + `currencyPosition`). Components fall back to `{ "$", "before" }` while config loads.

## Components & design system

Components follow **atomic design** under `src/components/`:
- `atoms/` — primitives *and* app-wide effect/provider components mounted in `layout.tsx`: `CustomCursor`, `Preloader`, `ScrollRevealProvider`, `CartToast` (toast context), `AuthRestorer`, `Analytics`, `Lightbox`, `BackToTop`.
- `molecules/`, `organisms/` — composed UI (e.g. `ProductCard`, `Navbar`, `SculptureDetail`, `Footer`).
- `ui/` — shadcn components (Tailwind v4 + `@base-ui/react`).

The design system is defined as CSS variables in [src/app/globals.css](src/app/globals.css) via Tailwind v4's `@theme inline`:
- **Dark by default.** Brand palette is `--color-chiave-*` (gold accent `#c8a96e`); each door has a `--color-door-*` color.
- Add the `.light-section` class to flip a subtree to the shop's light theme.
- Fonts: **Cormorant Garamond** (`--font-display`) and **Outfit** (`--font-body`), loaded via `next/font/google` in `layout.tsx`. Components set them inline via `style={{ fontFamily: "var(--font-display)" }}`.
- Scroll-reveal animations: add the `.reveal` class; `ScrollRevealProvider` (an IntersectionObserver) adds `.visible` when the element enters the viewport, and watches for dynamically added `.reveal` nodes via a MutationObserver.

## Testing
- **Vitest** (`happy-dom`, `globals: true`, setup in `src/test/setup.ts`) for unit/component tests, co-located in `__tests__/` dirs. `e2e/` is excluded from vitest.
- **Playwright** specs in `e2e/` run against `localhost:3000` and reuse/auto-start the dev server. Files prefixed `_` (e.g. `e2e/_audit-responsive.ts`) are helper scripts, not specs.

## Environment & deploy
Required env vars (in `.env.local`, gitignored). Both server- and `NEXT_PUBLIC_`-prefixed forms exist because cart/checkout run client-side:
- `MANTARAY_API_KEY` / `NEXT_PUBLIC_MANTARAY_API_KEY`
- `CONVEX_URL` / `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional — gates Google Analytics)

`next.config.ts` allowlists the Convex image host (`fast-jaguar-540.convex.cloud`) for `next/image`; add new remote image hosts there.

Deploy targets are Netlify (`netlify.toml`) and Vercel (`.vercelignore`). **Caveat:** the app was recently relocated from a `chiave-website/` subdirectory to the repo root, but `netlify.toml` still sets `base = "chiave-website"` and the SDK-integration plan still references `chiave-website/.env.local` — those paths are stale relative to the current root-level layout.

"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";
import { useCart, useStoreConfig } from "@mantaray-digital/store-sdk/react";
import { formatPrice } from "@/lib/format-price";

export default function CartPage() {
  const { cart, loading, error, updateItem, removeItem, clear } = useCart();
  const { data: storeConfig } = useStoreConfig();
  const hasLoadedOnce = useRef(false);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [optimisticQuantities, setOptimisticQuantities] = useState<Map<string, number>>(new Map());

  if (cart && !loading) {
    hasLoadedOnce.current = true;
  }

  const handleUpdateItem = useCallback(
    async (productId: string, quantity: number, variantId?: string | null) => {
      const key = `${productId}-${variantId ?? ""}`;
      setOptimisticQuantities((prev) => new Map(prev).set(key, quantity));
      setUpdatingItems((prev) => new Set(prev).add(key));
      try {
        await updateItem(productId, quantity, variantId ?? undefined);
      } finally {
        setUpdatingItems((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
        setOptimisticQuantities((prev) => {
          const next = new Map(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [updateItem]
  );

  const handleRemoveItem = useCallback(
    async (productId: string, variantId?: string | null) => {
      const key = `${productId}-${variantId ?? ""}`;
      setUpdatingItems((prev) => new Set(prev).add(key));
      try {
        await removeItem(productId, variantId ?? undefined);
      } finally {
        setUpdatingItems((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [removeItem]
  );

  const isInitialLoad = loading && !hasLoadedOnce.current;

  const currencySettings = storeConfig?.settings ?? {
    currencySymbol: "$",
    currencyPosition: "before" as const,
  };

  const displayPrice = (amount: number) => formatPrice(amount, currencySettings);

  if (isInitialLoad) {
    return (
      <>
        <section className="grain relative flex h-[40vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 to-[#0a0a0a]" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <span
              className="animate-hero-reveal mb-4 text-xs font-medium uppercase text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.5em" }}
            >
              Your Selection
            </span>
            <div className="overflow-hidden">
              <h1
                className="animate-hero-slide-up font-light text-[#e8e2d8]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                }}
              >
                Shopping Cart
              </h1>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center bg-[#0a0a0a] px-6 py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[#c8a96e]" />
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <section className="grain relative flex h-[40vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 to-[#0a0a0a]" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <span
              className="animate-hero-reveal mb-4 text-xs font-medium uppercase text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.5em" }}
            >
              Your Selection
            </span>
            <div className="overflow-hidden">
              <h1
                className="animate-hero-slide-up font-light text-[#e8e2d8]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                }}
              >
                Shopping Cart
              </h1>
            </div>
          </div>
        </section>
        <section className="bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="mb-6 h-16 w-16 text-[#2a2a2a]" strokeWidth={1} />
              <h2
                className="mb-3 text-2xl font-light text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Unable to load your cart
              </h2>
              <p
                className="mb-8 text-sm text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Something went wrong. Please try again or continue browsing.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition-colors hover:bg-[#b8994e]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Try Again
                </button>
                <Link
                  href="/shop"
                  className="border border-[#2a2a2a] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#8a8278] no-underline transition-colors hover:border-[#c8a96e] hover:text-[#c8a96e]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Browse Shop
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const items = cart?.items ?? [];
  const count = cart?.itemCount ?? 0;
  const subtotal = cart?.subtotal ?? 0;

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex h-[40vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 to-[#0a0a0a]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <span
            className="animate-hero-reveal mb-4 text-xs font-medium uppercase text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)", letterSpacing: "0.5em" }}
          >
            Your Selection
          </span>
          <div className="overflow-hidden">
            <h1
              className="animate-hero-slide-up font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
              Shopping Cart
            </h1>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          {/* Back to shop */}
          <Link
            href="/shop"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="mb-6 h-16 w-16 text-[#2a2a2a]" strokeWidth={1} />
              <h2
                className="mb-3 text-2xl font-light text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your cart is empty
              </h2>
              <p
                className="mb-8 text-sm text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Explore our collection and add something you love.
              </p>
              <Link
                href="/shop"
                className="bg-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] no-underline transition-colors hover:bg-[#b8994e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Items List */}
              <div className="lg:col-span-2">
                {/* Header row */}
                <div
                  className="mb-6 hidden grid-cols-[2fr_1fr_1fr_auto] items-center gap-6 border-b border-[#2a2a2a] pb-4 text-xs uppercase tracking-[0.2em] text-[#8a8278] md:grid"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                  <span className="w-8" />
                </div>

                {/* Cart items */}
                <ul className="m-0 flex list-none flex-col gap-0 p-0">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.variantId ?? ""}`}
                      className="grid grid-cols-[80px_1fr] gap-4 border-b border-[#1a1a1a] py-6 md:grid-cols-[2fr_1fr_1fr_auto] md:items-center md:gap-6"
                    >
                      {/* Product info */}
                      <div className="col-span-2 flex gap-4 md:col-span-1">
                        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded bg-[#1a1a1a]">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <ShoppingBag className="h-6 w-6 text-[#3a3a3a]" strokeWidth={1} />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3
                            className="text-base font-light text-[#e8e2d8]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {item.name}
                          </h3>
                          <p
                            className="mt-1 text-xs text-[#8a8278]"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {displayPrice(item.price)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-start-2 flex items-center justify-start md:col-start-auto md:justify-center">
                        {(() => {
                          const itemKey = `${item.productId}-${item.variantId ?? ""}`;
                          const isItemUpdating = updatingItems.has(itemKey);
                          const displayQuantity = optimisticQuantities.get(itemKey) ?? item.quantity;
                          return (
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  item.quantity <= 1
                                    ? handleRemoveItem(item.productId, item.variantId)
                                    : handleUpdateItem(item.productId, item.quantity - 1, item.variantId)
                                }
                                disabled={isItemUpdating}
                                className="flex h-8 w-8 items-center justify-center border border-[#2a2a2a] text-[#8a8278] transition-colors hover:border-[#c8a96e] hover:text-[#c8a96e] disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span
                                className="min-w-[2rem] text-center text-sm text-[#e8e2d8]"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {displayQuantity}
                              </span>
                              <button
                                onClick={() => handleUpdateItem(item.productId, item.quantity + 1, item.variantId)}
                                disabled={isItemUpdating}
                                className="flex h-8 w-8 items-center justify-center border border-[#2a2a2a] text-[#8a8278] transition-colors hover:border-[#c8a96e] hover:text-[#c8a96e] disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Line total */}
                      <span
                        className="col-start-2 text-left text-sm text-[#e8e2d8] md:col-start-auto md:text-right"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {displayPrice(item.price * item.quantity)}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemoveItem(item.productId, item.variantId)}
                        className="col-start-2 justify-self-start text-[#8a8278] transition-colors hover:text-red-400 md:col-start-auto md:justify-self-auto"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Clear cart */}
                <button
                  onClick={() => clear()}
                  className="mt-6 text-xs uppercase tracking-[0.2em] text-[#8a8278] transition-colors hover:text-red-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 border border-[#2a2a2a] bg-[#0f0f0f] p-6">
                  <h2
                    className="mb-6 text-lg font-light uppercase tracking-[0.15em] text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Order Summary
                  </h2>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span
                        className="text-xs text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Subtotal ({count} {count === 1 ? "item" : "items"})
                      </span>
                      <span
                        className="text-sm text-[#e8e2d8]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {displayPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span
                        className="text-xs text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Shipping
                      </span>
                      <span
                        className="text-sm text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Calculated at checkout
                      </span>
                    </div>

                    <div className="my-3 border-t border-[#2a2a2a]" />

                    <div className="flex justify-between">
                      <span
                        className="text-xs uppercase tracking-[0.15em] text-[#8a8278]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="text-xl font-light text-[#e8e2d8]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {displayPrice(subtotal)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/shop/checkout"
                    className="mt-6 block w-full bg-[#c8a96e] py-3.5 text-center text-xs uppercase tracking-[0.25em] text-[#0a0a0a] no-underline transition-colors hover:bg-[#b8994e]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

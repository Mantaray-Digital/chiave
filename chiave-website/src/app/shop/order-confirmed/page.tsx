"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useStoreConfig } from "@mantaray-digital/store-sdk/react";
import { formatPrice } from "@/lib/format-price";

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const { data: storeConfig } = useStoreConfig();

  const orderNumber = searchParams.get("orderNumber");
  const totalParam = searchParams.get("total");
  const total = totalParam ? parseFloat(totalParam) : null;

  const currencySettings = storeConfig?.settings ?? {
    currencySymbol: "$",
    currencyPosition: "before" as const,
  };

  const displayPrice = (amount: number) => formatPrice(amount, currencySettings);

  if (!orderNumber) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
        <h1
          className="mb-3 text-2xl font-light text-[#e8e2d8]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          No order found
        </h1>
        <p
          className="mb-8 text-sm text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          It seems you haven&apos;t placed an order yet.
        </p>
        <Link
          href="/shop"
          className="bg-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] no-underline transition-colors hover:bg-[#b8994e]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Browse Shop
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex h-[40vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 to-[#0a0a0a]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <CheckCircle
            className="animate-hero-reveal mb-5 h-14 w-14 text-[#c8a96e]"
            strokeWidth={1}
          />
          <div className="overflow-hidden">
            <h1
              className="animate-hero-slide-up font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
              Order Confirmed
            </h1>
          </div>
          <p
            className="animate-hero-reveal mt-4 text-sm text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)", animationDelay: "0.6s" }}
          >
            Thank you for your purchase
          </p>
        </div>
      </section>

      {/* Receipt */}
      <section className="bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          {/* Order Info Bar */}
          <div className="mb-10 grid grid-cols-2 gap-4 border border-[#2a2a2a] bg-[#0f0f0f] p-5 md:grid-cols-3">
            <div>
              <span
                className="block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Order Number
              </span>
              <span
                className="mt-1 block text-sm font-medium text-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {orderNumber}
              </span>
            </div>
            <div>
              <span
                className="block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Date
              </span>
              <span
                className="mt-1 block text-sm text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {total !== null && (
              <div>
                <span
                  className="block text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Total
                </span>
                <span
                  className="mt-1 block text-sm font-medium text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {displayPrice(total)}
                </span>
              </div>
            )}
          </div>

          {/* Confirmation message */}
          <div className="mb-10 border border-[#2a2a2a] bg-[#0f0f0f] p-6">
            <p
              className="text-sm leading-relaxed text-[#8a8278]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your order has been placed successfully. You will receive a confirmation
              email shortly with your order details and tracking information once your
              order ships.
            </p>
          </div>

          {/* Continue Shopping */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Link
              href="/shop"
              className="bg-[#c8a96e] px-10 py-3.5 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] no-underline transition-colors hover:bg-[#b8994e]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.2em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-14 w-14 animate-pulse text-[#c8a96e]" strokeWidth={1} />
            <p
              className="text-sm text-[#8a8278]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Loading order details...
            </p>
          </div>
        </section>
      }
    >
      <OrderConfirmedContent />
    </Suspense>
  );
}

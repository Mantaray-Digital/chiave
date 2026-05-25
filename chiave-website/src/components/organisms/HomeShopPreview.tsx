"use client";

import Link from "next/link";
import { useProducts } from "@mantaray-digital/store-sdk/react";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SectionHeader } from "@/components/atoms/SectionHeader";

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-[#2a2a2a] shadow-sm animate-pulse">
      <div className="aspect-[3/4] bg-[#3a3a3a]" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-5 w-3/4 rounded bg-[#3a3a3a]" />
        <div className="h-3 w-full rounded bg-[#3a3a3a]" />
        <div className="h-3 w-1/2 rounded bg-[#3a3a3a]" />
        <div className="mt-2 h-4 w-1/3 rounded bg-[#3a3a3a]" />
      </div>
    </div>
  );
}

export function HomeShopPreview() {
  const { data, loading } = useProducts();
  const products = data?.products ?? [];
  const previewProducts = [...products]
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    .slice(0, 4);
  const previewCount = previewProducts.length;

  return (
    <section className="px-6 py-32 md:px-12 lg:px-24">
      <SectionHeader
        label="02 — Products"
        title="Chiave Shop"
        subtitle="A curated selection of objects from the studio"
      />

      {loading ? (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : previewCount === 0 ? (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-sm border border-[#2a2a2a] bg-[#141414] px-6 py-16 text-center">
          <span
            className="text-[10px] uppercase tracking-[0.4em] text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Coming Soon
          </span>
          <p
            className="text-lg italic text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            New pieces are on the way — check back soon.
          </p>
          <p
            className="max-w-md text-sm leading-relaxed text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Products are loaded live from the Chiave store. Once items are
            published in the Mantaray dashboard they&apos;ll appear here
            automatically.
          </p>
        </div>
      ) : (
        <div
          className={`mx-auto grid gap-4 md:gap-6 ${
            previewCount === 1
              ? "max-w-sm grid-cols-1"
              : previewCount === 2
                ? "max-w-3xl grid-cols-2"
                : previewCount === 3
                  ? "max-w-5xl grid-cols-2 md:grid-cols-3"
                  : "max-w-6xl grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {previewProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-16 flex justify-center">
        <Link
          href="/shop"
          className="inline-block border border-[#c8a96e] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Visit the Shop
        </Link>
      </div>
    </section>
  );
}

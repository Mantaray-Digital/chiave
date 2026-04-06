"use client";

import { useState } from "react";
import Image from "next/image";
import { useProducts, useCategories } from "@mantaray-digital/store-sdk/react";
import { ShopBestSellers } from "@/components/organisms/ShopBestSellers";
import { ShopCategories } from "@/components/organisms/ShopCategories";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SearchBar } from "@/components/molecules/SearchBar";

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-[#faf8f5] shadow-sm animate-pulse">
      <div className="aspect-[3/4] bg-[#e0dbd4]" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-5 w-3/4 rounded bg-[#e0dbd4]" />
        <div className="h-3 w-full rounded bg-[#e0dbd4]" />
        <div className="h-3 w-1/2 rounded bg-[#e0dbd4]" />
        <div className="mt-2 h-4 w-1/3 rounded bg-[#e0dbd4]" />
      </div>
    </div>
  );
}

function SectionSkeleton({ title }: { title: string }) {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <h2
            className="text-3xl font-light text-[#1a1a1a] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <div className="hidden h-[1px] flex-1 bg-[#c4b9a8] ml-8 md:block" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ShopPage() {
  const { data: productsData, loading: productsLoading } = useProducts();
  const { data: categoriesData, loading: categoriesLoading } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const products = productsData?.products ?? [];
  const categories = categoriesData ?? [];

  // Use first 8 products as "featured / best sellers"
  const bestSellers = products.slice(0, 8);

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !activeCategory || p.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex h-[70vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/shop/Screenshot 2026-03-26 144506.png"
          alt="Chiave Shop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <span
            className="animate-hero-reveal mb-6 text-xs font-medium uppercase text-[#c8a96e]"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.5em",
              animationDelay: "0.5s",
            }}
          >
            02 — Curated Objects
          </span>

          <div className="overflow-hidden">
            <h1
              className="animate-hero-slide-up font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 300,
                letterSpacing: "0.08em",
                animationDelay: "0.3s",
              }}
            >
              Chiave Shop
            </h1>
          </div>

          <p
            className="animate-hero-reveal mt-6 max-w-xl text-lg italic text-[#c4b9a8] md:text-xl"
            style={{
              fontFamily: "var(--font-display)",
              animationDelay: "0.9s",
            }}
          >
            Collectible design, delivered with intention
          </p>
        </div>
      </section>

      {/* ──────────────── Transition: dark to light ──────────────── */}
      <div
        className="h-[120px]"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a, #f5f0ea)",
        }}
      />

      {/* ──────────────── Light Section Wrapper ──────────────── */}
      <div className="light-section bg-[#f5f0ea]">
        {/* ────────────── Best Sellers ────────────── */}
        {productsLoading ? (
          <SectionSkeleton title="Best Sellers" />
        ) : (
          bestSellers.length > 0 && <ShopBestSellers products={bestSellers} />
        )}

        {/* ────────────── Shop Categories ────────────── */}
        {categoriesLoading || productsLoading ? (
          <SectionSkeleton title="Browse by Category" />
        ) : (
          categories.length > 0 && (
            <ShopCategories products={products} categories={categories} />
          )
        )}

        {/* ────────────── All Products Grid ────────────── */}
        <section className="reveal px-6 py-20 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            {/* Heading */}
            <div className="mb-8 flex items-end justify-between">
              <h2
                className="text-3xl font-light text-[#1a1a1a] md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                All Products
              </h2>
              <span
                className="ml-4 text-sm text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {productsLoading
                  ? "..."
                  : `${filteredProducts.length} item${filteredProducts.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            {/* Search & Filters */}
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
              />

              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                      activeCategory === null
                        ? "bg-[#1a1a1a] text-[#e8e2d8]"
                        : "border border-[#c4b9a8] text-[#8a8278] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === cat._id ? null : cat._id
                        )
                      }
                      className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                        activeCategory === cat._id
                          ? "bg-[#1a1a1a] text-[#e8e2d8]"
                          : "border border-[#c4b9a8] text-[#8a8278] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p
                  className="text-lg text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  No products found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ──────────────── Transition: light to dark ──────────────── */}
      <div
        className="h-[120px]"
        style={{
          background: "linear-gradient(to bottom, #f5f0ea, #0a0a0a)",
        }}
      />
    </>
  );
}

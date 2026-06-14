"use client";

import { useState } from "react";
import type { ProductListItem, Category } from "@mantaray-digital/store-sdk";
import { ProductCard } from "@/components/molecules/ProductCard";

interface ShopCategoriesProps {
  products: ProductListItem[];
  categories: Category[];
}

export function ShopCategories({ products, categories }: ShopCategoriesProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="reveal px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex items-end justify-between">
          <h2
            className="text-3xl font-light text-[#1a1a1a] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Browse by Category
          </h2>
          <div className="hidden h-[1px] flex-1 bg-[#c4b9a8] ml-8 md:block" />
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (p) => p.categoryId === category._id
            );
            const isExpanded = expanded[category._id] ?? false;

            return (
              <div key={category._id} className="flex flex-col">
                {/* Category card */}
                <button
                  onClick={() => toggle(category._id)}
                  className="group flex flex-col rounded-lg border border-[#c4b9a8]/40 bg-[#faf8f5] p-6 text-left transition-all duration-300 hover:border-[#c8a96e]/60 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3
                      className="text-xl font-light text-[#1a1a1a] md:text-2xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {category.name}
                    </h3>
                    <span
                      className="flex h-6 w-6 items-center justify-center text-lg text-[#4a4a4a] transition-transform duration-300"
                      style={{
                        transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>

                  {category.description && (
                    <p
                      className="mb-3 text-sm leading-relaxed text-[#4a4a4a]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {category.description}
                    </p>
                  )}

                  <span
                    className="text-xs uppercase tracking-[0.2em] text-[#8a8278]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {category.productCount}{" "}
                    {category.productCount === 1 ? "product" : "products"}
                  </span>
                </button>

                {/* Expanded product grid */}
                {isExpanded && categoryProducts.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

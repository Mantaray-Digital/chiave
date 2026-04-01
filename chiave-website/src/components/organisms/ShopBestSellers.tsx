"use client";

import type { Product, ProductListItem } from "@mantaray-digital/store-sdk";
import { ProductCard } from "@/components/molecules/ProductCard";

interface ShopBestSellersProps {
  products: (Product | ProductListItem)[];
}

export function ShopBestSellers({ products }: ShopBestSellersProps) {
  return (
    <section className="reveal px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex items-end justify-between">
          <h2
            className="text-3xl font-light text-[#1a1a1a] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Best Sellers
          </h2>
          <div className="hidden h-[1px] flex-1 bg-[#c4b9a8] ml-8 md:block" />
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-x-visible md:pb-0 md:snap-none">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[260px] flex-shrink-0 snap-start md:min-w-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product, ProductListItem } from "@mantaray-digital/store-sdk";
import { useCart, useStoreConfig } from "@mantaray-digital/store-sdk/react";
import { formatPrice } from "@/lib/format-price";

interface ProductCardProps {
  product: Product | ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { data: storeConfig } = useStoreConfig();
  const inStock = product.stock === undefined || product.stock > 0;
  const hasDiscount =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.basePrice;

  const settings = storeConfig?.settings ?? {
    currencySymbol: "$",
    currencyPosition: "before" as const,
  };

  const formattedPrice = formatPrice(product.basePrice, settings);
  const formattedComparePrice = hasDiscount
    ? formatPrice(product.compareAtPrice!, settings)
    : null;

  const mainImage = product.images[0] ?? "/images/placeholder.png";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-[#faf8f5] shadow-sm transition-shadow duration-500 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Link
            href={`/shop/${product._id}`}
            className="border border-white/80 px-6 py-2 text-xs uppercase tracking-[0.25em] text-white no-underline transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            View
          </Link>
          {inStock && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product._id);
              }}
              className="flex items-center gap-2 border border-white/80 bg-white/0 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-[#c8a96e] hover:border-[#c8a96e] hover:text-[#0a0a0a]"
              style={{ fontFamily: "var(--font-body)" }}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add
            </button>
          )}
        </div>

        {/* Sale badge */}
        {hasDiscount && (
          <span
            className="absolute left-3 top-3 bg-[#c8a96e] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Sale
          </span>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span
              className="text-xs uppercase tracking-[0.25em] text-white/80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3
          className="mb-1 text-base font-light text-[#1a1a1a] md:text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h3>
        <p
          className="mb-2 line-clamp-2 text-xs leading-relaxed text-[#4a4a4a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {product.description}
        </p>
        <div className="mt-auto">
          {inStock ? (
            <span className="flex items-center gap-2">
              <span
                className="text-sm font-medium text-[#1a1a1a]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {formattedPrice}
              </span>
              {formattedComparePrice && (
                <span
                  className="text-xs text-[#8a8278] line-through"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {formattedComparePrice}
                </span>
              )}
            </span>
          ) : (
            <span
              className="text-sm font-medium text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

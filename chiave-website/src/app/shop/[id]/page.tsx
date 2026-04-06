"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react";
import {
  useProduct,
  useRelatedProducts,
  useCart,
  useStoreConfig,
} from "@mantaray-digital/store-sdk/react";
import { formatPrice } from "@/lib/format-price";
import { useCartToast } from "@/components/atoms/CartToast";

function ProductDetailSkeleton() {
  return (
    <>
      <div className="h-[100px] bg-[#0a0a0a]" />
      <section className="bg-[#0a0a0a] px-6 pt-4 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-32 rounded bg-[#2a2a2a] animate-pulse" />
        </div>
      </section>
      <section className="bg-[#0a0a0a] px-6 pb-20 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[3/4] rounded-lg bg-[#1a1a1a] animate-pulse" />
          <div className="flex flex-col justify-center gap-4">
            <div className="h-4 w-24 rounded bg-[#2a2a2a] animate-pulse" />
            <div className="h-10 w-3/4 rounded bg-[#2a2a2a] animate-pulse" />
            <div className="h-8 w-32 rounded bg-[#2a2a2a] animate-pulse" />
            <div className="border-t border-[#2a2a2a]" />
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-[#2a2a2a] animate-pulse" />
              <div className="h-3 w-full rounded bg-[#2a2a2a] animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-[#2a2a2a] animate-pulse" />
            </div>
            <div className="h-12 w-full rounded bg-[#2a2a2a] animate-pulse md:w-64" />
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error } = useProduct(id);
  const { data: relatedProducts } = useRelatedProducts(id, 4);
  const { addItem } = useCart();
  const { showToast } = useCartToast();
  const { data: storeConfig } = useStoreConfig();
  const settings = storeConfig?.settings ?? {
    currencySymbol: "$",
    currencyPosition: "before" as const,
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
        <h1
          className="mb-3 text-2xl font-light text-[#e8e2d8]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Product not found
        </h1>
        <p
          className="mb-8 text-sm text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/shop"
          className="bg-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] no-underline transition-colors hover:bg-[#b8994e]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Back to Shop
        </Link>
      </section>
    );
  }

  const inStock = product.stock === undefined || product.stock > 0;
  const hasDiscount =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.basePrice;

  const formattedPrice = formatPrice(product.basePrice, settings);
  const formattedComparePrice = hasDiscount
    ? formatPrice(product.compareAtPrice!, settings)
    : null;

  const images = product.images.length > 0 ? product.images : ["/images/placeholder.png"];
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-[100px] bg-[#0a0a0a]" />

      {/* Breadcrumb */}
      <section className="bg-[#0a0a0a] px-6 pt-4 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </section>

      {/* Product Detail */}
      <section className="bg-[#0a0a0a] px-6 pb-20 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div
              className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-lg bg-[#1a1a1a]"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {hasDiscount && (
                <span
                  className="absolute left-4 top-4 bg-[#c8a96e] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Sale
                </span>
              )}

              {!inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span
                    className="text-sm uppercase tracking-[0.25em] text-white/80"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border-2 transition-colors ${
                      i === selectedImage
                        ? "border-[#c8a96e]"
                        : "border-transparent hover:border-[#2a2a2a]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0a0a0a]/90"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close lightbox"
                className="absolute right-6 top-6 z-10 text-3xl text-[#e8e2d8] transition-colors hover:text-[#c8a96e]"
              >
                &times;
              </button>
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="relative z-10 max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            {product.category?.name && (
              <span
                className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {product.category.name}
              </span>
            )}

            {/* Name */}
            <h1
              className="mb-4 font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6 flex items-center gap-3">
              <span
                className="text-2xl font-light text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {inStock ? formattedPrice : "Sold Out"}
              </span>
              {inStock && formattedComparePrice && (
                <span
                  className="text-lg text-[#8a8278] line-through"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {formattedComparePrice}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="mb-6 border-t border-[#2a2a2a]" />

            {/* Description */}
            <p
              className="mb-8 text-sm leading-relaxed text-[#8a8278]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {product.description}
            </p>

            {/* Add to Cart */}
            {inStock ? (
              <button
                onClick={() => {
                  addItem(product._id);
                  showToast({
                    productName: product.name,
                    productImage: images[0],
                    price: formattedPrice,
                  });
                }}
                className="mb-8 flex w-full items-center justify-center gap-3 bg-[#c8a96e] py-4 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] transition-colors hover:bg-[#b8994e] md:w-auto md:px-16"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            ) : (
              <button
                disabled
                className="mb-8 w-full cursor-not-allowed bg-[#2a2a2a] py-4 text-xs uppercase tracking-[0.25em] text-[#8a8278] md:w-auto md:px-16"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Out of Stock
              </button>
            )}

            {/* Features */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-[#c8a96e]" strokeWidth={1.5} />
                <span
                  className="text-xs text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Free shipping on orders over $500
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-[#c8a96e]" strokeWidth={1.5} />
                <span
                  className="text-xs text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Authenticity guaranteed
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 text-[#c8a96e]" strokeWidth={1.5} />
                <span
                  className="text-xs text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  14-day return policy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <>
          <div className="mx-auto max-w-7xl border-t border-[#2a2a2a]" />

          <section className="bg-[#0a0a0a] px-6 py-20 md:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">
              <h2
                className="mb-10 text-2xl font-light text-[#e8e2d8] md:text-3xl"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
              >
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <RelatedProductCard key={p._id} product={p} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Bottom transition */}
      <div
        className="h-[60px]"
        style={{ background: "linear-gradient(to bottom, #0a0a0a, #0a0a0a)" }}
      />
    </>
  );
}

/**
 * Minimal card for related products (ProductSearchResult shape).
 * ProductSearchResult has `imageUrl` (single string) instead of `images[]`,
 * so we can't use the full ProductCard directly.
 */
import type { ProductSearchResult } from "@mantaray-digital/store-sdk";

function RelatedProductCard({ product }: { product: ProductSearchResult }) {
  const { data: storeConfig } = useStoreConfig();
  const settings = storeConfig?.settings ?? {
    currencySymbol: "$",
    currencyPosition: "before" as const,
  };

  const inStock = product.stock === undefined || product.stock > 0;
  const hasDiscount =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.basePrice;

  const formattedPrice = formatPrice(product.basePrice, settings);
  const formattedComparePrice = hasDiscount
    ? formatPrice(product.compareAtPrice!, settings)
    : null;

  const image = product.imageUrl ?? "/images/placeholder.png";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-[#faf8f5] shadow-sm transition-shadow duration-500 hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Link
            href={`/shop/${product._id}`}
            className="border border-white/80 px-6 py-2 text-xs uppercase tracking-[0.25em] text-white no-underline transition-colors duration-300 hover:bg-white hover:text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            View
          </Link>
        </div>

        {hasDiscount && (
          <span
            className="absolute left-3 top-3 bg-[#c8a96e] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Sale
          </span>
        )}

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

      <div className="flex flex-1 flex-col p-4">
        <h3
          className="mb-1 text-base font-light text-[#1a1a1a] md:text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h3>
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

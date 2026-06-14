"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Ruler, Palette, CheckCircle2 } from "lucide-react";
import type { Sculpture } from "@/types";
import { formatEgp, formatDimensions } from "@/lib/format-sculpture";

interface Props {
  sculpture: Sculpture;
  prev: Sculpture;
  next: Sculpture;
  others: Sculpture[];
}

export function SculptureDetail({ sculpture, prev, next, others }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = sculpture.images;

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-[100px] bg-[#0a0a0a]" />

      {/* Breadcrumb / back */}
      <section className="bg-[#0a0a0a] px-6 pt-4 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/sculptures"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            All Sculptures
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#8a8278]" style={{ fontFamily: "var(--font-body)" }}>
            <Link
              href={`/sculptures/${prev.id}`}
              aria-label={`Previous sculpture: ${prev.name}`}
              className="rounded-sm border border-[#2a2a2a] p-2 text-[#8a8278] no-underline transition-colors hover:border-[#c8a96e] hover:text-[#c8a96e]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href={`/sculptures/${next.id}`}
              aria-label={`Next sculpture: ${next.name}`}
              className="rounded-sm border border-[#2a2a2a] p-2 text-[#8a8278] no-underline transition-colors hover:border-[#c8a96e] hover:text-[#c8a96e]"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product detail */}
      <section className="bg-[#0a0a0a] px-6 pb-20 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image gallery */}
          <div className="flex flex-col gap-3">
            <div
              className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-lg bg-[#1a1a1a]"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={images[selectedImage]}
                alt={sculpture.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {!sculpture.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span
                    className="text-sm uppercase tracking-[0.25em] text-white/80"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Made to order
                  </span>
                </div>
              )}
            </div>

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
                    aria-label={`Show image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${sculpture.name} ${i + 1}`}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[selectedImage]}
                alt={sculpture.name}
                className="relative z-10 max-h-[90vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span
              className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {sculpture.id} — Sculpture
            </span>

            <h1
              className="mb-4 font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              {sculpture.name}
            </h1>

            <div className="mb-6 flex flex-col gap-1">
              <span
                className="text-2xl font-light text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatEgp(sculpture.priceEgp)}
              </span>
              {sculpture.priceNote && (
                <span
                  className="text-xs uppercase tracking-[0.15em] text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {sculpture.priceNote}
                </span>
              )}
            </div>

            <div className="mb-6 border-t border-[#2a2a2a]" />

            <p
              className="mb-8 text-sm leading-relaxed text-[#c4b9a8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {sculpture.description}
            </p>

            {/* Specs */}
            <dl className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Spec
                icon={<Ruler className="h-4 w-4 text-[#c8a96e]" strokeWidth={1.5} />}
                label="Dimensions"
                value={formatDimensions(sculpture)}
              />
              <Spec
                icon={<Palette className="h-4 w-4 text-[#c8a96e]" strokeWidth={1.5} />}
                label="Finish"
                value={sculpture.colors}
              />
              <Spec
                icon={
                  <CheckCircle2
                    className={`h-4 w-4 ${sculpture.inStock ? "text-[#c8a96e]" : "text-[#8a8278]"}`}
                    strokeWidth={1.5}
                  />
                }
                label="Availability"
                value={sculpture.inStock ? "Available" : "Made to order"}
              />
            </dl>

            <Link
              href={`/contact?ref=${sculpture.id}`}
              className="mb-8 inline-flex w-full items-center justify-center gap-3 bg-[#c8a96e] py-4 text-xs uppercase tracking-[0.25em] text-[#0a0a0a] no-underline transition-colors hover:bg-[#b8994e] md:w-auto md:px-16"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Mail className="h-4 w-4" />
              Inquire about this piece
            </Link>
          </div>
        </div>
      </section>

      {/* Other sculptures */}
      <div className="mx-auto max-w-7xl border-t border-[#2a2a2a]" />
      <section className="bg-[#0a0a0a] px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <h2
              className="text-2xl font-light text-[#e8e2d8] md:text-3xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
            >
              More sculptures
            </h2>
            <Link
              href="/sculptures"
              className="hidden text-xs uppercase tracking-[0.25em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e] md:inline"
              style={{ fontFamily: "var(--font-body)" }}
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {others.map((other) => (
              <Link
                key={other.id}
                href={`/sculptures/${other.id}`}
                className="group flex flex-col overflow-hidden rounded-sm bg-[#1a1a1a] no-underline transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a]"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={other.images[0]}
                    alt={other.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-3">
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] text-[#c8a96e]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {other.id}
                  </span>
                  <span
                    className="truncate text-sm font-light text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {other.name}
                  </span>
                  <span
                    className="mt-1 text-xs text-[#8a8278]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {formatEgp(other.priceEgp)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8a8278]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {icon}
        {label}
      </dt>
      <dd
        className="text-sm text-[#e8e2d8]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {value}
      </dd>
    </div>
  );
}

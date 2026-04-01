"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { ArthausPiece } from "@/types";

/* ─── Lightbox ───────────────────────────────────────────────────────────────── */

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-6 top-6 z-10 text-3xl text-[#e8e2d8] transition-colors hover:text-[#c8a96e]"
      >
        &times;
      </button>
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1500}
          className="max-h-[90vh] w-auto object-contain"
        />
      </div>
    </div>
  );
}

/* ─── Featured Pieces (alternating layout) ───────────────────────────────────── */

function FeaturedPiece({
  piece,
  index,
}: {
  piece: ArthausPiece;
  index: number;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={`reveal flex flex-col gap-8 md:gap-12 lg:gap-16 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } items-center`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Image side */}
      <div className="w-full md:w-1/2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image
            src={piece.image}
            alt={piece.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* Text side */}
      <div className="flex w-full flex-col justify-center md:w-1/2">
        <span
          className="mb-4 text-sm font-light tracking-[0.3em] text-[#c8a96e]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {piece.number}
        </span>

        <h3
          className="mb-6 text-3xl font-light text-[#e8e2d8] md:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {piece.name}
        </h3>

        <p
          className="mb-8 max-w-md text-base leading-relaxed text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {piece.description}
        </p>

        <div>
          <button
            className="border border-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Compact Gallery Grid ───────────────────────────────────────────────────── */

function CompactGrid({ pieces }: { pieces: ArthausPiece[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxSrc({ src, alt });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {pieces.map((piece, index) => (
          <button
            key={piece.id}
            onClick={() => openLightbox(piece.image, piece.name)}
            className={`reveal reveal-delay-${Math.min(
              index + 1,
              6
            )} group relative aspect-[4/5] overflow-hidden rounded-sm`}
          >
            <Image
              src={piece.image}
              alt={piece.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark overlay on hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/0 transition-all duration-500 group-hover:bg-[#0a0a0a]/70">
              <span
                className="translate-y-4 text-lg font-light text-[#e8e2d8] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {piece.name}
              </span>

              <span
                className="mt-3 translate-y-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Inquire &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc.src}
          alt={lightboxSrc.alt}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

/* ─── Main Export ─────────────────────────────────────────────────────────────── */

interface ArthausGalleryProps {
  featuredPieces: ArthausPiece[];
  compactPieces: ArthausPiece[];
}

export function ArthausGallery({
  featuredPieces,
  compactPieces,
}: ArthausGalleryProps) {
  return (
    <>
      {/* ── Featured Pieces: Large alternating layout ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl space-y-24 md:space-y-32">
          {featuredPieces.map((piece, index) => (
            <FeaturedPiece key={piece.id} piece={piece} index={index} />
          ))}
        </div>
      </section>

      {/* ── Compact Gallery Grid ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="reveal mb-16 text-center">
          <span
            className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Collection
          </span>
          <h2
            className="text-3xl font-light text-[#e8e2d8] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            More Pieces
          </h2>
          <div className="mx-auto mt-6 h-[1px] w-16 bg-[#c8a96e]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <CompactGrid pieces={compactPieces} />
        </div>
      </section>
    </>
  );
}

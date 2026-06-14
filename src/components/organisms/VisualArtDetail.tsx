"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { VisualArt } from "@/types";
import { VISUAL_ART_SIZE_NOTE } from "@/lib/visual-arts";

interface Props {
  art: VisualArt;
  prev: VisualArt;
  next: VisualArt;
  others: VisualArt[];
}

export function VisualArtDetail({ art, prev, next, others }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-[100px] bg-[#0a0a0a]" />

      {/* Breadcrumb / back */}
      <section className="bg-[#0a0a0a] px-6 pt-4 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/visual-arts"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8a8278] no-underline transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            All Visual Arts
          </Link>

          <div
            className="flex items-center gap-2 text-xs text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Link
              href={`/visual-arts/${prev.id}`}
              aria-label={`Previous: ${prev.name}`}
              className="rounded-sm border border-[#2a2a2a] p-2 text-[#8a8278] no-underline transition-colors hover:border-[#c8a96e] hover:text-[#c8a96e]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href={`/visual-arts/${next.id}`}
              aria-label={`Next: ${next.name}`}
              className="rounded-sm border border-[#2a2a2a] p-2 text-[#8a8278] no-underline transition-colors hover:border-[#c8a96e] hover:text-[#c8a96e]"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Detail: title + two images side-by-side + size note */}
      <section className="bg-[#0a0a0a] px-6 pb-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h1
              className="font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                letterSpacing: "0.05em",
              }}
            >
              {art.name}
            </h1>
            <div className="mx-auto mt-4 h-[1px] w-16 bg-[#c8a96e]" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <ArtFrame
              src={art.originalImage}
              alt={`${art.name} — original`}
              caption="Original"
              onOpen={() => setLightbox(art.originalImage)}
            />
            <ArtFrame
              src={art.portraitImage}
              alt={`${art.name} — wall portrait`}
              caption="Wall Portrait"
              onOpen={() => setLightbox(art.portraitImage)}
            />
          </div>

          <p
            className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-[#c4b9a8] md:text-lg"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {VISUAL_ART_SIZE_NOTE}
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0a0a0a]/90"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
            className="absolute right-6 top-6 z-10 text-3xl text-[#e8e2d8] transition-colors hover:text-[#c8a96e]"
          >
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt={art.name}
            className="relative z-10 max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Other portraits */}
      <div className="mx-auto max-w-7xl border-t border-[#2a2a2a]" />
      <section className="bg-[#0a0a0a] px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <h2
              className="text-2xl font-light text-[#e8e2d8] md:text-3xl"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
              }}
            >
              More portraits
            </h2>
            <Link
              href="/visual-arts"
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
                href={`/visual-arts/${other.id}`}
                className="group flex flex-col overflow-hidden rounded-sm bg-[#1a1a1a] no-underline transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a]">
                  <Image
                    src={other.portraitImage}
                    alt={other.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-3">
                  <span
                    className="truncate text-sm font-light text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {other.name}
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

function ArtFrame({
  src,
  alt,
  caption,
  onOpen,
}: {
  src: string;
  alt: string;
  caption: string;
  onOpen: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onOpen}
        className="relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-lg bg-[#1a1a1a]"
        aria-label={`Open ${caption}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </button>
      <span
        className="text-center text-xs uppercase tracking-[0.25em] text-[#c8a96e]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {caption}
      </span>
    </div>
  );
}

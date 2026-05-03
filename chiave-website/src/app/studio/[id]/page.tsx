import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { STUDIO_IMAGES } from "@/lib/constants";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return STUDIO_IMAGES.map((img) => ({ id: img.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = STUDIO_IMAGES.find((i) => i.id === id);
  if (!item) return { title: "Studio" };
  return {
    title: `${item.label} — Chiave Studio`,
    description: item.description,
  };
}

export default async function StudioImagePage({ params }: PageProps) {
  const { id } = await params;
  const index = STUDIO_IMAGES.findIndex((i) => i.id === id);
  if (index === -1) notFound();

  const item = STUDIO_IMAGES[index];
  const prev =
    STUDIO_IMAGES[(index - 1 + STUDIO_IMAGES.length) % STUDIO_IMAGES.length];
  const next = STUDIO_IMAGES[(index + 1) % STUDIO_IMAGES.length];
  const others = STUDIO_IMAGES.filter((_, i) => i !== index);

  return (
    <main className="bg-[#0a0a0a] text-[#e8e2d8]">
      {/* Back link */}
      <section className="px-6 pt-32 md:px-12 lg:px-24">
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8a8278] transition-colors hover:text-[#c8a96e]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <ArrowLeft size={14} />
          Back to Studio
        </Link>
      </section>

      {/* Image stage — centred, capped at viewport so it always fits */}
      <section className="px-6 pt-8 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <div className="relative flex max-h-[75vh] w-full items-center justify-center overflow-hidden rounded-sm bg-[#101010]">
            <Image
              src={item.image}
              alt={item.label}
              width={1600}
              height={1600}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="h-auto max-h-[75vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Label + Description */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="mb-4 block text-xs uppercase tracking-[0.4em] text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(STUDIO_IMAGES.length).padStart(2, "0")}
          </span>
          <h1
            className="font-light text-[#e8e2d8]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
            }}
          >
            {item.label}
          </h1>
          <div className="mx-auto mt-6 h-[1px] w-12 bg-[#c8a96e]" />
          <p
            className="mt-8 text-base leading-relaxed text-[#c4b9a8] md:text-lg"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
          >
            {item.description}
          </p>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="border-t border-[#1a1a1a] px-6 py-10 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link
            href={`/studio/${prev.id}`}
            className="group flex items-center gap-3 text-left text-xs uppercase tracking-[0.25em] text-[#8a8278] transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-[10px] tracking-[0.3em] text-[#5a5a5a]">
                Previous
              </span>
              <span className="mt-0.5 block normal-case tracking-normal text-[#e8e2d8]" style={{ fontFamily: "var(--font-display)" }}>
                {prev.label}
              </span>
            </span>
          </Link>

          <Link
            href={`/studio/${next.id}`}
            className="group flex items-center gap-3 text-right text-xs uppercase tracking-[0.25em] text-[#8a8278] transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>
              <span className="block text-[10px] tracking-[0.3em] text-[#5a5a5a]">
                Next
              </span>
              <span className="mt-0.5 block normal-case tracking-normal text-[#e8e2d8]" style={{ fontFamily: "var(--font-display)" }}>
                {next.label}
              </span>
            </span>
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Other images */}
      <section className="px-6 pb-32 pt-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-10 text-center text-xs uppercase tracking-[0.4em] text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Continue Browsing
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {others.map((other) => (
              <Link
                key={other.id}
                href={`/studio/${other.id}`}
                className="group relative aspect-square overflow-hidden rounded-sm bg-[#1a1a1a]"
              >
                <Image
                  src={other.image}
                  alt={other.label}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span
                    className="p-4 text-xs font-medium uppercase tracking-[0.2em] text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {other.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

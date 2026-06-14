import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { SCULPTURES } from "@/lib/sculptures";
import { formatEgp, formatDimensions } from "@/lib/format-sculpture";

export const metadata: Metadata = {
  title: "Sculptures",
  description:
    "Chiave's sculpture catalogue — figurative, abstract and lighting sculptures, hand-finished in the studio. KAWS, Bearbrick, Kong and original abstract pieces.",
};

export default function SculpturesPage() {
  return (
    <main>
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex h-[70vh] items-end overflow-hidden">
        <Image
          src={SCULPTURES[5].images[0]}
          alt="Chiave Sculptures"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

        <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-24">
          <span
            className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            01 — Sculptures
          </span>

          <h1
            className="font-light text-[#e8e2d8]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              lineHeight: 1,
            }}
          >
            Chiave Sculptures
          </h1>

          <p
            className="mt-4 text-lg italic text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Figures, forms and lighting — hand-finished in the studio
          </p>

          <div className="mt-6 h-[1px] w-16 bg-[#c8a96e]" />
        </div>
      </section>

      {/* ────────────────────── Catalog Grid ─────────────────────── */}
      <section className="bg-[#0a0a0a] px-6 py-24 md:px-12 lg:px-24">
        <SectionHeader
          label="The Catalogue"
          title="Available Pieces"
          subtitle={`${SCULPTURES.length} sculptures — each available in all colours unless noted.`}
        />

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {SCULPTURES.map((s) => (
            <Link
              key={s.id}
              href={`/sculptures/${s.id}`}
              className="reveal group relative flex flex-col overflow-hidden rounded-sm bg-[#1a1a1a] no-underline transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a]"
              style={{ borderTop: "2px solid #c8a96e" }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a]">
                <Image
                  src={s.images[0]}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span
                  className="mb-1 text-[10px] uppercase tracking-[0.25em] text-[#c8a96e]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {s.id}
                </span>
                <h3
                  className="mb-2 text-lg font-light text-[#e8e2d8] md:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.name}
                </h3>
                <p
                  className="mb-3 text-xs leading-relaxed text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {formatDimensions(s)}
                </p>
                <span
                  className="mt-auto text-sm font-medium text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {formatEgp(s.priceEgp)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

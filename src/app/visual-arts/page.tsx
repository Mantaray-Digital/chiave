import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { VISUAL_ARTS } from "@/lib/visual-arts";

export const metadata: Metadata = {
  title: "Visual Arts",
  description:
    "Chiave's visual arts catalogue — wall portraits and altered art, available in standard sizes and special order dimensions.",
};

export default function VisualArtsPage() {
  return (
    <main>
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex h-[70vh] items-end overflow-hidden">
        <Image
          src={VISUAL_ARTS[0].portraitImage}
          alt="Chiave Visual Arts"
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
            02 — Visual Arts
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
            Chiave Visual Arts
          </h1>

          <p
            className="mt-4 text-lg italic text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Wall portraits and altered art, printed on canvas
          </p>

          <div className="mt-6 h-[1px] w-16 bg-[#c8a96e]" />
        </div>
      </section>

      {/* ────────────────────── Catalog Grid ─────────────────────── */}
      <section className="bg-[#0a0a0a] px-6 py-24 md:px-12 lg:px-24">
        <SectionHeader
          label="The Collection"
          title="Wall Portraits"
          subtitle="Tap a portrait to see the artwork alongside its wall-display version."
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {VISUAL_ARTS.map((v) => (
            <Link
              key={v.id}
              href={`/visual-arts/${v.id}`}
              className="reveal group relative flex flex-col overflow-hidden rounded-sm bg-[#1a1a1a] no-underline transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a]"
              style={{ borderTop: "2px solid #c8a96e" }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0a0a0a]">
                <Image
                  src={v.portraitImage}
                  alt={v.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
              </div>

              <div className="flex flex-col p-5">
                <h3
                  className="text-lg font-light text-[#e8e2d8] md:text-xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

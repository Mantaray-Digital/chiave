import Image from "next/image";
import Link from "next/link";
import { DOORS, STUDIO_IMAGES } from "@/lib/constants";
import type { Door } from "@/types";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { StudioGallery } from "@/components/organisms/StudioGallery";

export default function StudioPage() {
  return (
    <main>
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex h-[70vh] items-end overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/studio/Screenshot 2026-03-26 144106.png"
          alt="Chiave Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dark overlay gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

        {/* Grain texture */}
        <div className="pointer-events-none absolute inset-0" />

        {/* Content */}
        <div className="relative z-10 px-6 pb-16 md:px-12 lg:px-24">
          <span
            className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            01 — Interior &amp; Architecture
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
            Chiave Studio
          </h1>

          <p
            className="mt-4 text-lg italic text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Crafting spaces that speak in silence
          </p>

          <div
            className="mt-6 h-[1px] w-16 bg-[#c8a96e]"
          />
        </div>
      </section>

      {/* ────────────────────── Seven Doors Grid ─────────────────────── */}
      <section className="px-6 py-32 md:px-12 lg:px-24">
        <SectionHeader
          label="The Seven Doors"
          title="Our Creative Universe"
        />

        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {DOORS.map((door: Door, index: number) => (
            <Link
              key={door.id}
              href="/studio"
              className="reveal group relative flex flex-col rounded-sm bg-[#1a1a1a] p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a]"
              style={{
                borderLeft: `4px solid ${door.color}`,
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <span
                className="mb-2 text-sm font-light"
                style={{
                  fontFamily: "var(--font-body)",
                  color: door.color,
                }}
              >
                {String(door.number).padStart(2, "0")}
              </span>

              <h3
                className="mb-2 text-lg font-light text-[#e8e2d8] md:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {door.name}
              </h3>

              <p
                className="text-xs leading-relaxed text-[#8a8278] md:text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {door.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ────────────────────── Portfolio Intro ──────────────────────── */}
      <section className="reveal px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-lg font-light leading-relaxed text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Every space tells a story. At Chiave Studio, we believe that
            architecture and interior design are acts of translation — turning
            invisible emotions, cultural memory, and human needs into physical
            environments that endure. Our work moves between scales, from urban
            master plans to the quiet details of a door handle, always guided by
            the same principle: restraint is a form of generosity.
          </p>
        </div>
      </section>

      {/* ──────────────────────── Image Gallery ──────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <SectionHeader
          label="Selected Work"
          title="Studio Portfolio"
        />

        <StudioGallery />
      </section>

      {/* ───────────────────────────── CTA ────────────────────────────── */}
      <section className="reveal px-6 py-32 text-center md:px-12 lg:px-24">
        <h2
          className="mb-8 text-3xl font-light text-[#e8e2d8] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Have a space that needs a soul?
        </h2>

        <Link
          href="/contact"
          className="inline-block border border-[#c8a96e] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Start a Conversation
        </Link>
      </section>
    </main>
  );
}

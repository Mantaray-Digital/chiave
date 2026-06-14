import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DOORS } from "@/lib/constants";
import type { Door } from "@/types";
import { SectionHeader } from "@/components/atoms/SectionHeader";
import { HomeShopPreview } from "@/components/organisms/HomeShopPreview";
import { HomeCharactersPreview } from "@/components/organisms/HomeCharactersPreview";
import { HomeArthausPreview } from "@/components/organisms/HomeArthausPreview";

export const metadata: Metadata = {
  title: "Chiave — Unlock Creative Vision",
  description:
    "Where vision becomes form, and form becomes legacy. Chiave is a design studio exploring seven creative disciplines.",
};

export default function Home() {
  return (
    <main>
      {/* ────────────────────────── Hero Section ────────────────────────── */}
      <section className="grain relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Radial gradient background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,169,110,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 30% 60%, rgba(200,169,110,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 70% 60%, rgba(200,169,110,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <span
            className="animate-hero-reveal mb-6 text-xs font-medium uppercase text-[#c8a96e]"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.5em",
              animationDelay: "0.5s",
            }}
          >
            Creative Direction &amp; Design
          </span>

          {/* Main heading */}
          <div className="overflow-hidden">
            <h1
              className="animate-hero-slide-up font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                fontWeight: 300,
                letterSpacing: "0.08em",
                animationDelay: "0.3s",
              }}
            >
              Chiave
            </h1>
          </div>

          {/* Tagline */}
          <p
            className="animate-hero-reveal mt-6 max-w-xl text-lg italic text-[#c4b9a8] md:text-xl"
            style={{
              fontFamily: "var(--font-display)",
              animationDelay: "0.9s",
            }}
          >
            Where vision becomes form, and form becomes legacy
          </p>

          {/* Gold vertical line */}
          <div
            className="animate-hero-reveal mt-10"
            style={{
              width: "1px",
              height: "80px",
              background: "#c8a96e",
              animationDelay: "1.2s",
            }}
          />
        </div>

        {/* Scroll indicator */}
        <span
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[#c8a96e]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Discover
        </span>
      </section>

      {/* ────────────────────── 01 — Seven Doors Section ─────────────────────── */}
      <section className="px-6 py-32 md:px-12 lg:px-24">
        <SectionHeader
          label="01 — The World of Chiave Studio"
          title={"Seven Doors,\nOne Vision"}
          subtitle="Each door — a different language of creation"
        />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DOORS.map((door: Door, index: number) => (
            <Link
              key={door.id}
              href={
                door.name === "Sculptures"
                  ? "/sculptures"
                  : door.name === "Visual Arts"
                    ? "/visual-arts"
                    : "/studio"
              }
              className={`reveal group relative flex flex-col overflow-hidden rounded-sm bg-[#1a1a1a] transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a] ${
                index === 6 ? "md:col-start-1 lg:col-start-2" : ""
              }`}
              style={{
                borderTop: `4px solid ${door.color}`,
                transitionDelay: `${index * 0.1}s`,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }}
            >
              <style>{`
                [data-door-id="${door.id}"]:hover {
                  box-shadow: 0 8px 30px ${door.color}22;
                }
              `}</style>
              <div
                data-door-id={door.id}
                className="pointer-events-none absolute inset-0 z-20"
              />

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
                <Image
                  src={door.image}
                  alt={door.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
              </div>

              <div className="flex flex-col p-8">
                <span
                  className="mb-4 text-sm font-light"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: door.color,
                  }}
                >
                  {String(door.number).padStart(2, "0")}
                </span>

                <h3
                  className="mb-3 text-2xl font-light text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {door.name}
                </h3>

                <p
                  className="text-sm leading-relaxed text-[#8a8278]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {door.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── 02 — Chiave Shop (Products) ───────────── */}
      <HomeShopPreview />

      {/* ───────── 03 — Chiave X chivoo.playground (Characters) ────────── */}
      <HomeCharactersPreview />

      {/* ───────── 04 — Chiave X Arthaus (Sinks & Pots) ────────── */}
      <HomeArthausPreview />

      {/* ───────────────────── Philosophy Section ──────────────────────── */}
      <section className="reveal px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 h-[1px] w-full bg-[#c8a96e]" />

          <blockquote className="text-center">
            <p
              className="text-xl font-light italic leading-relaxed text-[#e8e2d8] md:text-2xl lg:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;Design is not what you see — it is what you feel when you
              stand inside an idea that has been given physical form.&rdquo;
            </p>
            <cite
              className="mt-8 block text-sm not-italic tracking-[0.3em] text-[#c8a96e]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              — Chiave
            </cite>
          </blockquote>

          <div className="mt-12 h-[1px] w-full bg-[#c8a96e]" />
        </div>
      </section>

      {/* ──────────────────── Contact Teaser Section ───────────────────── */}
      <section className="reveal px-6 py-32 text-center md:px-12 lg:px-24">
        <h2
          className="mb-8 text-3xl font-light text-[#e8e2d8] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to collaborate?
        </h2>

        <Link
          href="/contact"
          className="inline-block border border-[#c8a96e] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Get in Touch
        </Link>
      </section>
    </main>
  );
}

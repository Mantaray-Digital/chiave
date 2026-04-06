import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PlaygroundGrid } from "@/components/organisms/PlaygroundGrid";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experimental and in-progress work from the Chiave studio.",
};

export default function PlaygroundPage() {
  return (
    <main>
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex h-[70vh] items-end overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/playground/Screenshot 2026-03-26 145351.png"
          alt="Chiave Playground"
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
            04 — Experimental
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
            Chiave.playground
          </h1>

          <p
            className="mt-4 text-lg italic text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ideas unbound — where curiosity leads, form follows
          </p>

          <div className="mt-6 h-[1px] w-16 bg-[#c8a96e]" />
        </div>
      </section>

      {/* ────────────────────── Intro Text ─────────────────────── */}
      <section className="reveal px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-lg font-light leading-relaxed text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The playground is where rules dissolve and instinct takes over. This
            is the experimental arm of Chiave&apos;s practice — a space for ideas
            that don&apos;t yet have a category, for collaborations that challenge
            convention, and for the raw creative impulse that feeds everything
            else. Not everything here is finished. That&apos;s the point.
          </p>
        </div>
      </section>

      {/* ──────────────────────── Image Grid ──────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <PlaygroundGrid />
      </section>

      {/* ───────────────────────────── CTA ────────────────────────────── */}
      <section className="reveal px-6 py-32 text-center md:px-12 lg:px-24">
        <h2
          className="mb-8 text-3xl font-light text-[#e8e2d8] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Want to collaborate on something unexpected?
        </h2>

        <Link
          href="/contact"
          className="inline-block border border-[#c8a96e] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Let&apos;s Experiment
        </Link>
      </section>
    </main>
  );
}

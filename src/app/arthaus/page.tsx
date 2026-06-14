import Link from "next/link";
import Image from "next/image";
import { ARTHAUS_PIECES, ARTHAUS_COMPACT } from "@/lib/constants";
import { ArthausGallery } from "@/components/organisms/ArthausGallery";

export const metadata = {
  title: "Arthaus Egypt — A Chiave Collaboration",
  description:
    "Where ancient craft meets contemporary vision. Arthaus Egypt is a living archive of Egyptian craftsmanship, presented in collaboration with Chiave.",
};

export default function ArthausPage() {
  return (
    <>
      {/* ────────────────────────── Page Hero — 70vh ────────────────────────── */}
      <section className="grain relative flex h-[70vh] items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/arthaus/collections/half-carved-face/01.jpg"
          alt="Arthaus Egypt — sculptural stone sink"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <span
            className="animate-hero-reveal mb-4 text-xs font-medium uppercase tracking-[0.5em] text-[#c8a96e]"
            style={{
              fontFamily: "var(--font-body)",
              animationDelay: "0.3s",
            }}
          >
            03 — Art &amp; Culture
          </span>

          <div className="overflow-hidden">
            <h1
              className="animate-hero-slide-up font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 300,
                letterSpacing: "0.06em",
                animationDelay: "0.2s",
              }}
            >
              Arthaus Egypt
            </h1>
          </div>

          <p
            className="animate-hero-reveal mt-4 max-w-xl text-lg italic text-[#c4b9a8] md:text-xl"
            style={{
              fontFamily: "var(--font-display)",
              animationDelay: "0.7s",
            }}
          >
            Where ancient craft meets contemporary vision
          </p>

          <span
            className="animate-hero-reveal mt-4 text-xs font-light uppercase tracking-[0.4em] text-[#c8a96e]"
            style={{
              fontFamily: "var(--font-body)",
              animationDelay: "1s",
            }}
          >
            A Chiave Collaboration
          </span>
        </div>
      </section>

      {/* ────────────────────────── Intro Text ──────────────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p
            className="text-lg font-light leading-relaxed text-[#c4b9a8] md:text-xl lg:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Arthaus Egypt is a living archive of Egyptian craftsmanship — a
            bridge between the hands of artisans who have shaped clay, stone,
            and metal for millennia, and the eye of a contemporary creative
            director who understands how to give tradition new relevance. Every
            piece is made by hand in Egypt, carrying the weight of heritage and
            the lightness of modern design.
          </p>

          <div className="mx-auto mt-10 h-[1px] w-16 bg-[#c8a96e]" />
        </div>
      </section>

      {/* ─────────────── Featured Pieces & Compact Gallery ──────────────────── */}
      <ArthausGallery
        featuredPieces={ARTHAUS_PIECES}
        compactPieces={ARTHAUS_COMPACT}
      />

      {/* ────────────────────────── CTA Section ─────────────────────────────── */}
      <section className="reveal px-6 py-32 text-center md:px-12 lg:px-24">
        <h2
          className="mb-4 text-3xl font-light text-[#e8e2d8] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Commission a bespoke piece
        </h2>

        <p
          className="mx-auto mb-10 max-w-lg text-base text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Every Arthaus creation begins with a conversation. Tell us your
          vision, and we will bring it to life through the hands of Egypt's
          finest artisans.
        </p>

        <Link
          href="/contact"
          className="inline-block border border-[#c8a96e] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Begin the Conversation
        </Link>
      </section>
    </>
  );
}

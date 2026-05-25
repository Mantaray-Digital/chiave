import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Chiave × chivoo.playground — Characters",
  description:
    "The Urbo character series — Chiave's playground collaboration with chivoo, a parallel cast of figures born in the studio's experimental arm.",
};

interface UrboCharacter {
  id: string;
  title: string;
  image: string;
  description: string;
}

const URBO_CHARACTERS: UrboCharacter[] = [
  {
    id: "urbo-01",
    title: "Urbo — I",
    image: "/images/chivoo-playground/urbo/1.jpeg",
    description:
      "The first character. Opening frame of the Urbo experiment, originally a sketchbook study before it grew into a parallel visual vocabulary for the studio.",
  },
  {
    id: "urbo-02",
    title: "Urbo — II",
    image: "/images/chivoo-playground/urbo/2.jpeg",
    description:
      "Iteration two pushes contrast and density — a deliberate overload that the rest of the series eventually learns to tone down.",
  },
  {
    id: "urbo-03",
    title: "Urbo — III",
    image: "/images/chivoo-playground/urbo/3.jpeg",
    description:
      "Geometry takes the lead. Stripped of figure and texture, the frame becomes purely architectural — a character of negative space.",
  },
  {
    id: "urbo-04",
    title: "Urbo — IV",
    image: "/images/chivoo-playground/urbo/4.jpeg",
    description:
      "A return to pigment. Layers of warm tone push back against the colder palette of the previous frames.",
  },
  {
    id: "urbo-05",
    title: "Urbo — V",
    image: "/images/chivoo-playground/urbo/5.jpeg",
    description:
      "A study of posture. The fifth character finds its identity in stance — quiet, deliberate, holding its own ground.",
  },
  {
    id: "urbo-06",
    title: "Urbo — VI",
    image: "/images/chivoo-playground/urbo/6.jpeg",
    description:
      "Halfway through the run. The composition opens up; negative space is allowed to do most of the talking.",
  },
  {
    id: "urbo-07",
    title: "Urbo — VII",
    image: "/images/chivoo-playground/urbo/7.jpeg",
    description:
      "Late-stage experiment with collage. Found textures are reintroduced after being absent from the middle of the series.",
  },
  {
    id: "urbo-08",
    title: "Urbo — VIII",
    image: "/images/chivoo-playground/urbo/8.jpeg",
    description:
      "A breath. The studio considered ending the series here — a self-contained character that needs no neighbour.",
  },
  {
    id: "urbo-09",
    title: "Urbo — IX",
    image: "/images/chivoo-playground/urbo/99.jpeg",
    description:
      "A coda. The ninth character resolves on a quiet, almost monochromatic note — a deliberate echo of where it started.",
  },
  {
    id: "urbo-10",
    title: "Urbo — X",
    image:
      "/images/chivoo-playground/urbo/WhatsApp-Image-2026-04-29-at-8.41.09-PM.jpeg",
    description:
      "The closing frame. A late addition from the studio, almost a portrait — the series stepping out of the page to look directly back.",
  },
];

export default function CharactersPage() {
  return (
    <main className="bg-[#0a0a0a] text-[#e8e2d8]">
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex h-[55vh] items-end overflow-hidden md:h-[60vh]">
        <Image
          src="/images/chivoo-playground-v2/Screenshot 2026-03-26 145244.png"
          alt="Chiave × chivoo.playground — Characters"
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
            03 — Characters
          </span>

          <h1
            className="font-light text-[#e8e2d8]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            Chiave × chivoo.playground
          </h1>

          <p
            className="mt-4 max-w-2xl text-lg italic text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Urbo series — a parallel cast born from the studio&apos;s experimental arm
          </p>

          <div className="mt-6 h-[1px] w-16 bg-[#c8a96e]" />
        </div>
      </section>

      {/* ───────────────────── Back Link ───────────────────── */}
      <section className="px-6 pt-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8a8278] transition-colors hover:text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </section>

      {/* ────────────────────── Intro Text ─────────────────────── */}
      <section className="reveal px-6 pt-12 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="text-lg font-light leading-relaxed text-[#c4b9a8] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A collaboration between Chiave and chivoo.playground. The Urbo series is a
            cast of characters built across a single run — each frame is a study of the
            one before it, and a question for the one that follows. Each piece is shown
            here as it exists in the studio&apos;s archive.
          </p>
        </div>
      </section>

      {/* ──────────────────── Character Gallery ──────────────────── */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-20 md:gap-24">
            {URBO_CHARACTERS.map((char, index) => {
              const isEven = index % 2 === 0;
              return (
                <article
                  key={char.id}
                  className={`reveal grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12 ${
                    isEven ? "" : "md:[&>div:first-child]:order-2"
                  }`}
                >
                  <div className="md:col-span-5">
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-sm bg-[#1a1a1a] md:max-w-none">
                      <Image
                        src={char.image}
                        alt={char.title}
                        fill
                        sizes="(max-width: 768px) 70vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-7">
                    <span
                      className="block text-xs uppercase tracking-[0.4em] text-[#c8a96e]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(URBO_CHARACTERS.length).padStart(2, "0")}
                    </span>

                    <h2
                      className="mt-4 font-light text-[#e8e2d8]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                        lineHeight: 1.1,
                      }}
                    >
                      {char.title}
                    </h2>

                    <div className="mt-4 h-[1px] w-10 bg-[#c8a96e]" />

                    <p
                      className="mt-6 text-base leading-relaxed text-[#c4b9a8] md:text-lg"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {char.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────── Full Gallery Grid ──────────────────── */}
      <section className="border-t border-[#1a1a1a] px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-10 text-center text-xs uppercase tracking-[0.4em] text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Full Cast
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {URBO_CHARACTERS.map((char) => (
              <div
                key={`thumb-${char.id}`}
                className="group relative aspect-square overflow-hidden rounded-sm bg-[#1a1a1a]"
              >
                <Image
                  src={char.image}
                  alt={char.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span
                    className="p-3 text-xs font-medium uppercase tracking-[0.2em] text-[#e8e2d8]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {char.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
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

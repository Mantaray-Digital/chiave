import Image from "next/image";
import Link from "next/link";
import { ARTHAUS_PIECES } from "@/lib/constants";
import { SectionHeader } from "@/components/atoms/SectionHeader";

export function HomeArthausPreview() {
  const previewPieces = ARTHAUS_PIECES.slice(0, 4);

  return (
    <section className="px-6 py-32 md:px-12 lg:px-24">
      <SectionHeader
        label="04 — Sinks & Pots"
        title={"Chiave × Arthaus"}
        subtitle="Where ancient craft meets contemporary vision — sculptural sinks, pots and objects in stone"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {previewPieces.map((piece, index) => (
          <Link
            key={piece.id}
            href="/arthaus"
            className="reveal group relative flex flex-col overflow-hidden rounded-sm bg-[#1a1a1a] transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a]"
            style={{
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0f0f0f]">
              <Image
                src={piece.image}
                alt={piece.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col p-6">
              <span
                className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {piece.number}
              </span>
              <h3
                className="mb-2 text-lg font-light leading-tight text-[#e8e2d8] md:text-xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {piece.name}
              </h3>
              <span
                className="mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#8a8278] transition-colors duration-500 group-hover:text-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Explore
                <svg
                  width="16"
                  height="8"
                  viewBox="0 0 18 10"
                  fill="none"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  <path
                    d="M1 5h16M13 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="reveal mt-16 flex justify-center">
        <Link
          href="/arthaus"
          className="inline-block border border-[#c8a96e] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Enter Arthaus
        </Link>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/atoms/SectionHeader";

const CHARACTER_PREVIEWS = [
  {
    id: "urbo-character-1",
    title: "Urbo I",
    image: "/images/chivoo-playground-v2/Screenshot 2026-03-26 145244.png",
  },
  {
    id: "urbo-character-2",
    title: "Urbo II",
    image: "/images/chivoo-playground-v2/Screenshot 2026-03-26 145351.png",
  },
  {
    id: "urbo-character-3",
    title: "Urbo III",
    image: "/images/chivoo-playground-v2/Screenshot 2026-03-26 145435.png",
  },
];

export function HomeCharactersPreview() {
  return (
    <section className="px-6 py-32 md:px-12 lg:px-24">
      <SectionHeader
        label="03 — Characters"
        title={"Chiave × chivoo.playground"}
        subtitle="A parallel universe of characters from the studio's playground"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {CHARACTER_PREVIEWS.map((char, index) => (
          <Link
            key={char.id}
            href="/playground/characters"
            className="reveal group relative aspect-[4/5] overflow-hidden rounded-sm bg-[#1a1a1a] transition-all duration-500 hover:-translate-y-1"
            style={{
              transitionDelay: `${index * 0.1}s`,
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            }}
          >
            <Image
              src={char.image}
              alt={char.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6">
              <span
                className="text-[10px] uppercase tracking-[0.4em] text-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {String(index + 1).padStart(2, "0")} / 03
              </span>
              <h3
                className="text-2xl font-light text-[#e8e2d8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {char.title}
              </h3>
              <span
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#e8e2d8] opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Enter the playground
                <svg
                  width="18"
                  height="10"
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
          href="/playground/characters"
          className="inline-block border border-[#c8a96e] px-10 py-4 text-xs uppercase tracking-[0.3em] text-[#c8a96e] transition-all duration-500 hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          See All Characters
        </Link>
      </div>
    </section>
  );
}

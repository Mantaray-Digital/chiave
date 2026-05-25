import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Who We Are — Chiave",
  description:
    "Chiave means 'Key' — the key to seven doors. Every door opens to a different artistic realm, ready to serve and immerse you in a unique creative experience.",
};

type Door = {
  number: string;
  name: string;
  long: string;
  short: string;
  image: string;
  alt: string;
  color: string;
};

const DOORS: Door[] = [
  {
    number: "01",
    name: "Sculptures & Installations",
    long: "This door is related to sculpture design, fabrication and installation. We can design any sculpture you want in different ways, materials and scales — in addition to our own designs in stock.",
    short:
      "Large or medium-scale works that transform spaces into living art, from statement sculptures to immersive installations.",
    image: "/images/about/02.jpg",
    alt: "Sculptural column installation with neon detail",
    color: "#e8712a",
  },
  {
    number: "02",
    name: "Visual Arts",
    long: "This door is related to graphics and visual design — designing posters, collages, and the like. For our own designs, we print them on T-shirts and portraits.",
    short:
      "Digital and traditional visuals — prints, posters, and designs that bring bold ideas to life.",
    image: "/images/about/03.jpg",
    alt: "Visual art composition reinterpreting a classical portrait",
    color: "#2d7dd2",
  },
  {
    number: "03",
    name: "Art Pieces",
    long: "This door is related to creating unique art pieces from normal things you may see in your daily life — but with our touch — or very different, out-of-the-box things.",
    short:
      "Unique handcrafted objects — tables, lights, and design items that blur the line between art and function.",
    image: "/images/about/04.jpg",
    alt: "Hand-crafted city map table piece",
    color: "#2a9d4e",
  },
  {
    number: "04",
    name: "3D Printing",
    long: "This door is related to cutting-edge 3D printed creations, from prototypes to collectible pieces, blending technology with design.",
    short:
      "From rapid prototypes to collectible figures — engineered, printed, and finished in the studio.",
    image: "/images/about/05.jpg",
    alt: "3D printed sculpture on the printer bed",
    color: "#e8c72a",
  },
  {
    number: "05",
    name: "Scenes & Miniatures",
    long: "This door is related to creating stories and scenes. From all the other doors — why can't we make a story for a character, a scene for a miniature world, or even build an imaginary scene from scratch and render it in Unreal Engine, Blender and other tools?",
    short:
      "Detailed dioramas and scaled environments that tell stories in miniature worlds.",
    image: "/images/about/06.jpg",
    alt: "Hand-crafted miniature artist studio scene",
    color: "#d42d7d",
  },
  {
    number: "06",
    name: "Characters",
    long: "This door is related to creating digital characters. Just imagine the character you want and we will design it for you, either digitally or physically.",
    short:
      "Original figure designs and collectibles that embody new identities, emotions, and worlds.",
    image: "/images/about/07.jpg",
    alt: "Original character figures",
    color: "#7b2dd4",
  },
  {
    number: "07",
    name: "Animations",
    long: "This door is related to animation and video editing. We create animations using either After Effects or AI methods to produce different pieces of art in animation styles.",
    short:
      "Experimental motion art that brings still concepts to life through movement and imagination.",
    image: "/images/about/08.jpg",
    alt: "Animation still — character composited into a street scene",
    color: "#2dc4d4",
  },
];

export default function WhoWeArePage() {
  return (
    <>
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex h-[70vh] items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/about/01.jpg"
          alt="Our Seven Doors — Chiave"
          fill
          sizes="100vw"
          className="object-cover object-right opacity-25"
          style={{ filter: "blur(6px)" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/95 via-[#0a0a0a]/90 to-[#0a0a0a]" />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <span
            className="animate-hero-reveal mb-4 text-xs font-medium uppercase tracking-[0.5em] text-[#c8a96e]"
            style={{
              fontFamily: "var(--font-body)",
              animationDelay: "0.3s",
            }}
          >
            About — The Studio
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
              Who We Are
            </h1>
          </div>

          <p
            className="animate-hero-reveal mt-4 max-w-2xl text-lg italic text-[#c4b9a8] md:text-xl"
            style={{
              fontFamily: "var(--font-display)",
              animationDelay: "0.7s",
            }}
          >
            Every door opens to a different artistic realm, ready to serve
            and immerse you in a unique creative experience.
          </p>

          <span
            className="animate-hero-reveal mt-4 text-xs font-light uppercase tracking-[0.4em] text-[#c8a96e]"
            style={{
              fontFamily: "var(--font-body)",
              animationDelay: "1s",
            }}
          >
            Chiave — The Key to Seven Doors
          </span>
        </div>
      </section>

      {/* ────────────────────────── Intro Text ──────────────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span
            className="mb-6 block text-xs font-medium uppercase tracking-[0.5em] text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Read This
          </span>

          <p
            className="text-lg font-light leading-relaxed text-[#c4b9a8] md:text-xl lg:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[#e8e2d8]">Chiave</span> means
            <em> &ldquo;Key&rdquo;</em> — and it is the key to{" "}
            <span className="text-[#e8e2d8]">seven doors</span>. The seven
            doors on our logo are related to art, where we try to show that
            art can exist in anything and everywhere. You can wear art,
            design art, buy art — even add art to an existing piece.
          </p>

          <p
            className="mt-6 text-base font-light leading-relaxed text-[#8a8278] md:text-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;Every color is a storyteller, weaving a theme or
            representing a door in our creative symphony.&rdquo;
          </p>

          <div className="mx-auto mt-10 h-[1px] w-16 bg-[#c8a96e]" />
        </div>
      </section>

      {/* ────────────────────────── Magazine Spread ─────────────────────────── */}
      <section className="reveal px-6 pb-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="/images/about/02j.jpg"
              alt="Chiave — the key to seven doors, magazine spread"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ────────────── The Seven Doors — alternating featured layout ──────── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="reveal mb-20 text-center">
          <span
            className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Doors
          </span>
          <h2
            className="text-3xl font-light text-[#e8e2d8] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our Seven Realms
          </h2>
          <div className="mx-auto mt-6 h-[1px] w-16 bg-[#c8a96e]" />
        </div>

        <div className="mx-auto max-w-7xl space-y-24 md:space-y-32">
          {DOORS.map((door, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={door.number}
                className={`reveal flex flex-col gap-8 md:gap-12 lg:gap-16 ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-center`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                {/* Image side */}
                <div className="w-full md:w-1/2">
                  <div className="relative w-full overflow-hidden rounded-sm bg-[#0a0a0a]">
                    <Image
                      src={door.image}
                      alt={door.alt}
                      width={1200}
                      height={1400}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>

                {/* Text side */}
                <div className="flex w-full flex-col justify-center md:w-1/2">
                  <span
                    className="mb-4 inline-flex items-center gap-3 text-sm font-light tracking-[0.3em] text-[#c8a96e]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-[10px] w-[10px] rounded-full"
                      style={{ backgroundColor: door.color }}
                    />
                    #{door.number}
                  </span>

                  <h3
                    className="mb-6 text-3xl font-light text-[#e8e2d8] md:text-4xl lg:text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {door.name}
                  </h3>

                  <p
                    className="mb-4 max-w-md text-base leading-relaxed text-[#d8d2c8]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {door.long}
                  </p>

                  <p
                    className="mb-8 max-w-md text-base italic leading-relaxed text-[#c4b9a8]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {door.short}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────── Featured Episode ────────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="reveal flex flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/images/about/post-01.jpg"
                  alt="Chiave — latest episode with Scoop Empire"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex w-full flex-col justify-center md:w-1/2">
              <span
                className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Latest Episode
              </span>

              <h2
                className="mb-6 text-3xl font-light text-[#e8e2d8] md:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Behind the Studio
              </h2>

              <p
                className="mb-8 max-w-md text-base leading-relaxed text-[#8a8278]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                A look behind the doors — featured in our latest episode
                with Scoop Empire, where we share the story behind Chiave
                and the seven realms that shape our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────── CTA Section ─────────────────────────────── */}
      <section className="reveal px-6 py-32 text-center md:px-12 lg:px-24">
        <h2
          className="mb-4 text-3xl font-light text-[#e8e2d8] md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Open a door with us
        </h2>

        <p
          className="mx-auto mb-10 max-w-lg text-base text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Tell us which realm calls to you — sculpture, visual art,
          characters, scenes, or something we haven&rsquo;t imagined yet.
          Every Chiave project starts with a conversation.
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

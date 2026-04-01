import { ContactForm } from "@/components/organisms/ContactForm";

export const metadata = {
  title: "Contact — Chiave",
  description:
    "Get in touch with Chiave for collaborations, commissions, acquisitions, or simply to say hello.",
};

export default function ContactPage() {
  return (
    <>
      {/* ────────────────────────── Page Hero ────────────────────────── */}
      <section className="grain relative flex min-h-[350px] items-center justify-center overflow-hidden h-[45vh]">
        {/* Radial gradient background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,169,110,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 30% 60%, rgba(200,169,110,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 70% 60%, rgba(200,169,110,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Label */}
          <span
            className="animate-hero-reveal mb-6 text-xs font-medium uppercase text-[#c8a96e]"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.5em",
              animationDelay: "0.5s",
            }}
          >
            Get in Touch
          </span>

          {/* Title */}
          <div className="overflow-hidden">
            <h1
              className="animate-hero-slide-up font-light text-[#e8e2d8]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 300,
                letterSpacing: "0.08em",
                animationDelay: "0.3s",
              }}
            >
              Contact
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="animate-hero-reveal mt-6 max-w-xl text-lg italic text-[#c4b9a8] md:text-xl"
            style={{
              fontFamily: "var(--font-display)",
              animationDelay: "0.9s",
            }}
          >
            Every great project begins with a conversation
          </p>
        </div>
      </section>

      {/* ────────────────────── Contact Section ──────────────────────── */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ── Left Column ── */}
          <div className="reveal">
            <h2
              className="text-3xl font-light leading-tight text-[#e8e2d8] md:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let&rsquo;s Create Something{" "}
              <em className="italic">Extraordinary</em>
            </h2>

            <p
              className="mt-6 max-w-lg text-base leading-relaxed text-[#8a8278] md:text-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              For collaborations, commissions, acquisitions, or simply to say
              hello — we&rsquo;d love to hear from you.
            </p>

            {/* Contact Details */}
            <div className="mt-12 space-y-8">
              {/* Email */}
              <div>
                <span
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Email
                </span>
                <a
                  href="mailto:hello@khaledsorour.com"
                  className="text-base text-[#e8e2d8] transition-colors duration-300 hover:text-[#c8a96e]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  hello@khaledsorour.com
                </a>
              </div>

              {/* Location */}
              <div>
                <span
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Location
                </span>
                <span
                  className="text-base text-[#e8e2d8]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Cairo, Egypt
                </span>
              </div>

              {/* Follow */}
              <div>
                <span
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Follow
                </span>
                <div
                  className="flex flex-wrap gap-x-6 gap-y-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <a
                    href="/studio"
                    className="text-base text-[#e8e2d8] transition-colors duration-300 hover:text-[#c8a96e]"
                  >
                    Chiave Studio
                  </a>
                  <a
                    href="/shop"
                    className="text-base text-[#e8e2d8] transition-colors duration-300 hover:text-[#c8a96e]"
                  >
                    Chiave Shop
                  </a>
                  <a
                    href="/arthaus"
                    className="text-base text-[#e8e2d8] transition-colors duration-300 hover:text-[#c8a96e]"
                  >
                    Arthaus Egypt
                  </a>
                  <a
                    href="/playground"
                    className="text-base text-[#e8e2d8] transition-colors duration-300 hover:text-[#c8a96e]"
                  >
                    Playground
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column (Form) ── */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

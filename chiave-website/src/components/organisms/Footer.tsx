import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/studio", label: "Chiave Studio" },
  { href: "/shop", label: "Chiave Shop" },
  { href: "/arthaus", label: "Arthaus Egypt" },
  { href: "/playground", label: "Playground" },
] as const;

export function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid rgba(74, 74, 74, 0.4)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center gap-10">
        {/* Brand */}
        <Link
          href="/"
          className="no-underline"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#e8e2d8",
            fontWeight: 400,
          }}
        >
          Chiave
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="no-underline text-[#8a8278] transition-colors duration-300 hover:text-[#c8a96e]"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div
          className="w-12"
          style={{ height: "1px", backgroundColor: "rgba(74, 74, 74, 0.4)" }}
        />

        {/* Copyright */}
        <p
          className="m-0 text-center"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            fontWeight: 300,
            letterSpacing: "0.12em",
            color: "#4a4a4a",
          }}
        >
          &copy; 2026 Chiave. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

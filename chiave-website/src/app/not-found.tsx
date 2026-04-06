import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <h1
          className="mb-4 text-6xl text-[#c8a96e]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <p
          className="mb-2 text-xl text-[#e8e2d8]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Page not found
        </p>
        <p
          className="mb-8 text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block border border-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#c8a96e] no-underline transition-colors hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

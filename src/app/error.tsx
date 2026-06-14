"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <h1
          className="mb-4 text-4xl text-[#e8e2d8]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Something went wrong
        </h1>
        <p
          className="mb-8 text-[#8a8278]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="border border-[#c8a96e] px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#c8a96e] transition-colors hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

"use client";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2
        className="mb-4 text-2xl text-[#e8e2d8]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <p
        className="mb-8 max-w-md text-[#8a8278]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="border border-[#c8a96e] px-6 py-2 text-xs uppercase tracking-[0.2em] text-[#c8a96e] transition-colors hover:bg-[#c8a96e] hover:text-[#0a0a0a]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

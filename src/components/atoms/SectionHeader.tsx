interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const dividerAlignment = align === "center" ? "mx-auto" : "";

  return (
    <div className={`reveal flex flex-col ${alignment} mb-16`}>
      <span
        className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#c8a96e]"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {label}
      </span>

      <h2
        className="text-3xl font-light leading-tight text-[#e8e2d8] md:text-5xl lg:text-6xl"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-4 max-w-2xl text-base italic text-[#c4baa8] md:text-lg"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {subtitle}
        </p>
      )}

      <div
        className={`mt-6 h-[1px] w-16 bg-[#c8a96e] ${dividerAlignment}`}
      />
    </div>
  );
}

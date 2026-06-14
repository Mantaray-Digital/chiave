"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8278]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent py-2.5 pl-10 pr-10 text-sm border border-[#2a2a2a] text-[#1a1a1a] placeholder:text-[#8a8278] focus:border-[#c8a96e] focus:outline-none transition-colors"
        style={{ fontFamily: "var(--font-body)" }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8278] hover:text-[#1a1a1a]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

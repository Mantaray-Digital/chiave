import type { Sculpture } from "@/types";

export function formatEgp(amount: number): string {
  return `EGP ${amount.toLocaleString("en-US")}`;
}

export function formatDimensions(s: Sculpture): string {
  const parts = [`H ${s.height} cm`];
  if (s.width) parts.push(`W ${s.width} cm`);
  return parts.join(" · ");
}

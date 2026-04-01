import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiave Shop — Curated Objects",
  description:
    "Collectible design, delivered with intention. Browse sculptures, art pieces, 3D prints, and miniatures.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

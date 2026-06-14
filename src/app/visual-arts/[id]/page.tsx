import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  VISUAL_ARTS,
  getVisualArtById,
  getAdjacentVisualArts,
  getOtherVisualArts,
} from "@/lib/visual-arts";
import { VisualArtDetail } from "@/components/organisms/VisualArtDetail";

export function generateStaticParams() {
  return VISUAL_ARTS.map((v) => ({ id: v.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const art = getVisualArtById(id);
  if (!art) {
    return { title: "Visual art not found" };
  }
  return {
    title: `${art.name} (${art.id})`,
    description: `${art.name} — wall portrait by Chiave. Special order in any dimensions; standard sizes 40x40 and 30x50 available.`,
  };
}

export default async function VisualArtDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const art = getVisualArtById(id);

  if (!art) {
    notFound();
  }

  const adjacent = getAdjacentVisualArts(id)!;
  const others = getOtherVisualArts(id, 6);

  return (
    <VisualArtDetail
      art={art}
      prev={adjacent.prev}
      next={adjacent.next}
      others={others}
    />
  );
}

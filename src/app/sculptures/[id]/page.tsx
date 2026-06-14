import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SCULPTURES,
  getSculptureById,
  getAdjacentSculptures,
  getOtherSculptures,
} from "@/lib/sculptures";
import { SculptureDetail } from "@/components/organisms/SculptureDetail";

export function generateStaticParams() {
  return SCULPTURES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sculpture = getSculptureById(id);
  if (!sculpture) {
    return { title: "Sculpture not found" };
  }
  return {
    title: `${sculpture.name} (${sculpture.id})`,
    description: sculpture.description,
  };
}

export default async function SculptureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sculpture = getSculptureById(id);

  if (!sculpture) {
    notFound();
  }

  const adjacent = getAdjacentSculptures(id)!;
  const others = getOtherSculptures(id, 6);

  return (
    <SculptureDetail
      sculpture={sculpture}
      prev={adjacent.prev}
      next={adjacent.next}
      others={others}
    />
  );
}

import Image from "next/image";
import Link from "next/link";
import { STUDIO_IMAGES } from "@/lib/constants";

export function StudioGallery() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {STUDIO_IMAGES.map((img, index) => (
        <Link
          key={img.id}
          href={`/studio/${img.id}`}
          className="reveal group relative aspect-square overflow-hidden rounded-sm bg-[#1a1a1a]"
          style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
        >
          <Image
            src={img.image}
            alt={img.label}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span
              className="p-4 text-xs font-medium uppercase tracking-[0.2em] text-[#e8e2d8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {img.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

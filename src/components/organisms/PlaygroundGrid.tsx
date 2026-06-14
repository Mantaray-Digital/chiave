import Image from "next/image";
import Link from "next/link";
import { PLAYGROUND_ITEMS } from "@/lib/constants";

export function PlaygroundGrid() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {PLAYGROUND_ITEMS.map((item, index) => (
        <Link
          key={item.id}
          href={`/playground/${item.id}`}
          className="reveal group relative aspect-square overflow-hidden rounded-sm bg-[#1a1a1a]"
          style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#c8a96e]"
            >
              <line
                x1="16"
                y1="6"
                x2="16"
                y2="26"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="6"
                y1="16"
                x2="26"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}

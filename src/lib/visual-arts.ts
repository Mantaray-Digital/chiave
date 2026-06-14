import type { VisualArt } from "@/types";

const IMG = "/images/doors/visual-arts";

export const VISUAL_ARTS: VisualArt[] = [
  {
    id: "VA-01",
    name: "Albert Einstein",
    originalImage: `${IMG}/1.jpg`,
    portraitImage: `${IMG}/1-MOCKUP.png`,
  },
  {
    id: "VA-02",
    name: "Goddess Taste",
    originalImage: `${IMG}/2.jpg`,
    portraitImage: `${IMG}/4-mockup.jpg`,
  },
  {
    id: "VA-03",
    name: "Sharks in the Forest",
    originalImage: `${IMG}/1-3.jpg`,
    portraitImage: `${IMG}/9-mockup.jpg`,
  },
  {
    id: "VA-04",
    name: "Alien's Observation",
    originalImage: `${IMG}/6-40-cm.jpg`,
    portraitImage: `${IMG}/6-mockup.jpg`,
  },
  {
    id: "VA-05",
    name: "Trumpin' Talks",
    originalImage: `${IMG}/7-40cm.jpg`,
    portraitImage: `${IMG}/7-mockup.jpg`,
  },
  {
    id: "VA-06",
    name: "The Catch",
    originalImage: `${IMG}/40-fe-40.jpg`,
    portraitImage: `${IMG}/square-canvas.jpg`,
  },
  {
    id: "VA-07",
    name: "Mona Lisa — Pink Smiley",
    originalImage: `${IMG}/06.jpg`,
    portraitImage: `${IMG}/10.jpg`,
  },
  {
    id: "VA-08",
    name: "Mona Lisa — Ski Mask",
    originalImage: `${IMG}/07.jpg`,
    portraitImage: `${IMG}/11.jpg`,
  },
  {
    id: "VA-09",
    name: "Mona Lisa — Bubblegum",
    originalImage: `${IMG}/03.jpg`,
    portraitImage: `${IMG}/12.jpg`,
  },
  {
    id: "VA-10",
    name: "Mona Lisa — Pop Graffiti",
    originalImage: `${IMG}/01.jpg`,
    portraitImage: `${IMG}/13.jpg`,
  },
  {
    id: "VA-11",
    name: "Astronaut — Moon Meditation",
    originalImage: `${IMG}/06-2.jpg`,
    portraitImage: `${IMG}/m07.jpg`,
  },
  {
    id: "VA-12",
    name: "The Barber Shop",
    originalImage: `${IMG}/2-40-cm.jpg`,
    portraitImage: `${IMG}/2-MOCKUP.jpg`,
  },
  {
    id: "VA-13",
    name: "Astronaut — Flamingo Float",
    originalImage: `${IMG}/04-2.jpg`,
    portraitImage: `${IMG}/m05.jpg`,
  },
  {
    id: "VA-14",
    name: "Astronaut — Marigold Field",
    originalImage: `${IMG}/02-2.jpg`,
    portraitImage: `${IMG}/m06.jpg`,
  },
  {
    id: "VA-15",
    name: "Astronaut — White Daisies",
    originalImage: `${IMG}/01-2.jpg`,
    portraitImage: `${IMG}/m08.jpg`,
  },
  {
    id: "VA-16",
    name: "Astronaut — Orange Moon",
    originalImage: `${IMG}/03-2.jpg`,
    portraitImage: `${IMG}/m03.jpg`,
  },
  {
    id: "VA-17",
    name: "The Odd — Solitude",
    originalImage: `${IMG}/02-3.jpg`,
    portraitImage: `${IMG}/010.jpg`,
  },
  {
    id: "VA-18",
    name: "The Odd — Red Among Black",
    originalImage: `${IMG}/09-2.jpg`,
    portraitImage: `${IMG}/077.jpg`,
  },
  {
    id: "VA-19",
    name: "The Odd — Night Walker",
    originalImage: `${IMG}/08-2.jpg`,
    portraitImage: `${IMG}/088.jpg`,
  },
  {
    id: "VA-20",
    name: "The Odd — Glowing Crowd",
    originalImage: `${IMG}/07-2.jpg`,
    portraitImage: `${IMG}/099.jpg`,
  },
  {
    id: "VA-21",
    name: "Mona Lisa — Four-Color",
    originalImage: `${IMG}/02.jpg`,
    portraitImage: `${IMG}/09.jpg`,
  },
  {
    id: "VA-22",
    name: "The Odd — Red Masks",
    originalImage: `${IMG}/06-3.jpg`,
    portraitImage: `${IMG}/033.jpg`,
  },
  {
    id: "VA-23",
    name: "The Odd — Lone Witness",
    originalImage: `${IMG}/03-3.jpg`,
    portraitImage: `${IMG}/011.jpg`,
  },
  {
    id: "VA-24",
    name: "The Odd — Among Heads",
    originalImage: `${IMG}/04-3.jpg`,
    portraitImage: `${IMG}/022.jpg`,
  },
  {
    id: "VA-25",
    name: "The Odd — Among Spheres",
    originalImage: `${IMG}/05-3.jpg`,
    portraitImage: `${IMG}/055.jpg`,
  },
  {
    id: "VA-26",
    name: "Mona Lisa — Pink Splatter",
    originalImage: `${IMG}/04.jpg`,
    portraitImage: `${IMG}/11.jpg`,
  },
  {
    id: "VA-27",
    name: "Mona Lisa — Pixel Bloom",
    originalImage: `${IMG}/05.jpg`,
    portraitImage: `${IMG}/10.jpg`,
  },
  {
    id: "VA-28",
    name: "Astronaut — Red Nebula",
    originalImage: `${IMG}/05-2.jpg`,
    portraitImage: `${IMG}/m02.jpg`,
  },
];

export const VISUAL_ART_SIZE_NOTE =
  "Special order in any dimensions and Standard sizes 40x40 and 30x50 are available.";

export function getVisualArtById(id: string): VisualArt | undefined {
  return VISUAL_ARTS.find((v) => v.id === id);
}

export function getAdjacentVisualArts(id: string): {
  prev: VisualArt;
  next: VisualArt;
} | null {
  const idx = VISUAL_ARTS.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  const prev =
    VISUAL_ARTS[(idx - 1 + VISUAL_ARTS.length) % VISUAL_ARTS.length];
  const next = VISUAL_ARTS[(idx + 1) % VISUAL_ARTS.length];
  return { prev, next };
}

export function getOtherVisualArts(id: string, count = 6): VisualArt[] {
  const idx = VISUAL_ARTS.findIndex((v) => v.id === id);
  if (idx === -1) return VISUAL_ARTS.slice(0, count);
  const others: VisualArt[] = [];
  const total = Math.min(count, VISUAL_ARTS.length - 1);
  for (let i = 1; i <= total; i++) {
    others.push(VISUAL_ARTS[(idx + i) % VISUAL_ARTS.length]);
  }
  return others;
}

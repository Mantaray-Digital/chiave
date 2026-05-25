import type { Sculpture } from "@/types";

const IMG = "/images/doors/sculptures";

// Source: docs/assets/Sculptures catalouge chiave.pdf (CH-S01 — CH-S54).
// Only entries with at least one image in /public/images/doors/sculptures/<code>/
// are listed. Sizes are in cm. Prices are in EGP (Egyptian pounds).
export const SCULPTURES: Sculpture[] = [
  {
    id: "CH-S01",
    name: "Kaws Original",
    height: 160,
    width: 70,
    colors: "All colors",
    priceEgp: 34000,
    inStock: true,
    description:
      "The signature KAWS silhouette rendered at near life scale. Hand-finished surface that softens the figure's pop iconography into a quieter, gallery-ready presence.",
    images: [`${IMG}/CH-S01/02.jpg`],
  },
  {
    id: "CH-S02",
    name: "Kaws Pump",
    height: 180,
    width: 85,
    colors: "All colors",
    priceEgp: 38000,
    inStock: true,
    description:
      "An expanded KAWS variant — taller, fuller, more deliberate in stance. Sized to anchor a foyer or a wide gallery wall without competing with surrounding work.",
    images: [`${IMG}/CH-S02/Gemini-Generated-Image-x1lh4ex1lh4ex1lh.png`],
  },
  {
    id: "CH-S03",
    name: "Kaws Bunny",
    height: 180,
    width: 60,
    colors: "All colors",
    priceEgp: 35000,
    inStock: true,
    description:
      "The Bunny take on the KAWS figure — long ears, narrow waist, an almost dancer's poise. Stands tall enough to read across an open room.",
    images: [`${IMG}/CH-S03/Gemini-Generated-Image-jdeijxjdeijxjdei.png`],
  },
  {
    id: "CH-S04",
    name: "Kaws Hand on Eyes",
    height: 160,
    width: 70,
    colors: "All colors",
    priceEgp: 34000,
    inStock: true,
    description:
      "The contemplative KAWS pose — hands cupped over the eyes. Holds the same scale as the Original, with a softer silhouette built around the bent arms.",
    images: [`${IMG}/CH-S04/Gemini-Generated-Image-svojivsvojivsvoj.png`],
  },
  {
    id: "CH-S05",
    name: "Kaws Hand on Eyes (Compact)",
    height: 130,
    width: 45,
    colors: "All colors",
    priceEgp: 23000,
    inStock: true,
    description:
      "The same Hand-on-Eyes pose at a more intimate scale. Sits comfortably in a smaller room or a domestic interior without losing presence.",
    images: [`${IMG}/CH-S05/Gemini-Generated-Image-svojivsvojivsvoj.png`],
  },
  {
    id: "CH-S06",
    name: "Hairy Kaws",
    height: 170,
    width: 70,
    colors: "All colors",
    priceEgp: 32000,
    inStock: true,
    description:
      "A textured variant of the KAWS figure — the surface broken into a tactile, hand-worked finish. One of the studio's most photographed pieces, available in a wide palette.",
    images: [
      `${IMG}/CH-S06/01.jpg`,
      `${IMG}/CH-S06/02.jpg`,
      `${IMG}/CH-S06/03.jpg`,
      `${IMG}/CH-S06/04.jpg`,
      `${IMG}/CH-S06/05.jpg`,
      `${IMG}/CH-S06/06.jpg`,
      `${IMG}/CH-S06/07.jpg`,
      `${IMG}/CH-S06/08.jpg`,
      `${IMG}/CH-S06/09.jpg`,
      `${IMG}/CH-S06/10.jpg`,
      `${IMG}/CH-S06/11.jpg`,
      `${IMG}/CH-S06/12.jpg`,
      `${IMG}/CH-S06/13.jpg`,
      `${IMG}/CH-S06/14.jpg`,
    ],
  },
  {
    id: "CH-S07",
    name: "Hoodie Gun",
    height: 170,
    width: 60,
    colors: "All colors",
    priceEgp: 38000,
    inStock: true,
    description:
      "A street-iconography figure — hood up, weight forward. Reads from across a room as silhouette first, detail second.",
    images: [
      `${IMG}/CH-S07/01.jpg`,
      `${IMG}/CH-S07/02.jpg`,
      `${IMG}/CH-S07/03.jpg`,
      `${IMG}/CH-S07/04.jpg`,
    ],
  },
  {
    id: "CH-S08",
    name: "Urban Bunny",
    height: 220,
    width: 90,
    colors: "All colors",
    priceEgp: 52000,
    inStock: true,
    description:
      "An oversized streetwear bunny — the studio's largest figural sculpture in this series. Built for double-height entries, courtyards and showroom anchors.",
    images: [`${IMG}/CH-S08/1.jpg`],
  },
  {
    id: "CH-S09",
    name: "Bearbrick Original",
    height: 120,
    colors: "All colors",
    priceEgp: 25000,
    inStock: true,
    description:
      "The collector-favourite Bearbrick form at a usable interior scale. Clean lines, generous painted surface, ready to carry a custom finish.",
    images: [
      `${IMG}/CH-S09/01.jpg`,
      `${IMG}/CH-S09/02.jpg`,
      `${IMG}/CH-S09/03.jpg`,
      `${IMG}/CH-S09/04.jpg`,
      `${IMG}/CH-S09/05.jpg`,
    ],
  },
  {
    id: "CH-S10",
    name: "Bearbrick Crown",
    height: 150,
    width: 90,
    colors: "All colors",
    priceEgp: 28000,
    inStock: true,
    description:
      "Bearbrick with a crown — the same iconic form, scaled up and given a regal accent. A statement piece for retail interiors and collector spaces.",
    images: [
      `${IMG}/CH-S10/01.jpg`,
      `${IMG}/CH-S10/02.jpg`,
      `${IMG}/CH-S10/03.jpg`,
    ],
  },
  {
    id: "CH-S11",
    name: "Large Scale Dog",
    height: 170,
    width: 180,
    colors: "All colors",
    priceEgp: 39000,
    inStock: true,
    description:
      "A monumental dog figure — wider than it is tall, built to occupy a generous footprint. Photographs particularly well against neutral architectural backgrounds.",
    images: [
      `${IMG}/CH-S11/01.jpg`,
      `${IMG}/CH-S11/02.jpg`,
      `${IMG}/CH-S11/03.jpg`,
      `${IMG}/CH-S11/04.jpg`,
    ],
  },
  {
    id: "CH-S12",
    name: "Bulldog",
    height: 100,
    colors: "All colors",
    priceEgp: 28000,
    inStock: true,
    description:
      "Compact, low-slung, deliberately heavy in proportion. The bulldog reads as guardian — a piece that earns its place by a doorway or at the foot of a staircase.",
    images: [`${IMG}/CH-S12/02.jpg`, `${IMG}/CH-S12/03.jpg`],
  },
  {
    id: "CH-S13",
    name: "Giraffe",
    height: 260,
    colors: "All colors",
    priceEgp: 40000,
    priceNote: "260 cm — also available at 300 cm for EGP 45,000",
    inStock: true,
    description:
      "A floor-to-ceiling giraffe in two heights. Both are sized for atriums and double-volume rooms where vertical drama is the point of the room.",
    images: [
      `${IMG}/CH-S13/01.jpg`,
      `${IMG}/CH-S13/02.jpg`,
      `${IMG}/CH-S13/03.jpg`,
      `${IMG}/CH-S13/WhatsApp-Image-2026-04-29-at-7.49.00-PM.jpeg`,
    ],
  },
  {
    id: "CH-S14",
    name: "Abstract Panther",
    height: 45,
    width: 160,
    colors: "All colors",
    priceEgp: 22000,
    inStock: true,
    description:
      "A horizontal panther reduced to its essential gesture — long, low, prowling. Designed as a console-top or shelf-length piece rather than a floor-standing sculpture.",
    images: [
      `${IMG}/CH-S14/744.jpeg`,
      `${IMG}/CH-S14/Gemini-Generated-Image-2pwo1g2pwo1g2pwo.png`,
      `${IMG}/CH-S14/WhatsApp-Image-2026-04-29-at-7.57.44-PM.jpeg`,
      `${IMG}/CH-S14/WhatsApp-Image-2026-04-29-at-7.57.45-PM.jpeg`,
    ],
  },
  {
    id: "CH-S15",
    name: "Large Size Kong",
    height: 300,
    width: 200,
    colors: "All colors",
    priceEgp: 70000,
    inStock: true,
    description:
      "Kong at the studio's largest scale — a centerpiece commission built for lobbies, brand showrooms and the kind of architecture that asks for a single dominant object.",
    images: [
      `${IMG}/CH-S15/Gemini-Generated-Image-5vffyb5vffyb5vff.png`,
      `${IMG}/CH-S15/WhatsApp-Image-2026-04-29-at-8.02.55-PM.jpeg`,
      `${IMG}/CH-S15/WhatsApp-Image-2026-04-29-at-8.02.56-PM.jpeg`,
    ],
  },
  {
    id: "CH-S16",
    name: "Medium Size Kong",
    height: 210,
    width: 150,
    colors: "All colors",
    priceEgp: 45000,
    inStock: true,
    description:
      "Kong at a more flexible scale — large enough to anchor a room, restrained enough to live inside a normal residential ceiling height.",
    images: [`${IMG}/CH-S16/Gemini-Generated-Image-5vffyb5vffyb5vff.png`],
  },
  {
    id: "CH-S17",
    name: "Small Size Kong",
    height: 90,
    width: 70,
    colors: "All colors",
    priceEgp: 12500,
    inStock: true,
    description:
      "Kong at desk and console scale. Same modelling language as the larger Kongs, sized to live on a surface rather than the floor.",
    images: [`${IMG}/CH-S17/Gemini-Generated-Image-5vffyb5vffyb5vff.png`],
  },
  {
    id: "CH-S18",
    name: "Lady Lighting Unit",
    height: 115,
    width: 65,
    colors: "All colors",
    priceEgp: 22000,
    inStock: true,
    description:
      "Figurative lighting — a seated lady form integrated with a warm interior light source. Reads as sculpture by day and as ambient lighting by night.",
    images: [`${IMG}/CH-S18/WhatsApp-Image-2026-04-29-at-8.05.41-PM.jpeg`],
  },
  {
    id: "CH-S19",
    name: "Abstract Lighting Unit (Rough)",
    height: 180,
    width: 70,
    colors: "All colors",
    priceEgp: 14000,
    priceNote: "Rough texture finish",
    inStock: true,
    description:
      "An abstract column-form light. The rough-texture finish catches its own shadow at every height, so the piece reads differently as you move past it.",
    images: [`${IMG}/CH-S19/Gemini-Generated-Image-xutjtexutjtexutj.png`],
  },
  {
    id: "CH-S20",
    name: "Abstract Lighting Unit (Smooth)",
    height: 160,
    width: 70,
    colors: "All colors",
    priceEgp: 12500,
    priceNote: "Smooth texture finish",
    inStock: true,
    description:
      "The smooth-finish counterpart to CH-S19 — a slightly shorter form, finished to a continuous matte surface that reads as one quiet vertical line in a room.",
    images: [`${IMG}/CH-S20/Gemini-Generated-Image-xutjtexutjtexutj.png`],
  },
  {
    id: "CH-S21",
    name: "Abstract Sculpture I",
    height: 170,
    width: 35,
    colors: "All colors",
    priceEgp: 21500,
    inStock: true,
    description:
      "A tall, narrow abstract form — closer to a stroke than an object. Designed to share a corner with architecture rather than fight it.",
    images: [`${IMG}/CH-S21/Gemini-Generated-Image-p7z15kp7z15kp7z1.png`],
  },
  {
    id: "CH-S22",
    name: "Abstract Sculpture II",
    height: 170,
    width: 35,
    colors: "All colors",
    priceEgp: 12000,
    priceNote: "EGP 12,000 each · full set of 4 for EGP 40,000",
    inStock: true,
    description:
      "A modular abstract piece intended to be grouped. Reads as a single object at distance and as a measured composition up close.",
    images: [`${IMG}/CH-S22/Untitled-2.jpg`],
  },
  {
    id: "CH-S23",
    name: "Abstract Lady",
    height: 160,
    width: 70,
    colors: "All colors",
    priceEgp: 18000,
    inStock: true,
    description:
      "A reduced female silhouette — anatomy implied, never described. The piece holds quiet authority without needing detail.",
    images: [`${IMG}/CH-S23/Gemini-Generated-Image-97d8j197d8j197d8.png`],
  },
  {
    id: "CH-S24",
    name: "Abstract Sculpture III",
    height: 160,
    width: 70,
    colors: "All colors",
    priceEgp: 13500,
    inStock: true,
    description:
      "An accessible-scale abstract — same vocabulary as the larger studio pieces, sized for residential interiors and tighter retail footprints.",
    images: [`${IMG}/CH-S24/Gemini-Generated-Image-9a2h6e9a2h6e9a2h.png`],
  },
  {
    id: "CH-S28",
    name: "Lighting Sculpture",
    height: 190,
    colors: "All colors",
    priceEgp: 17500,
    inStock: true,
    description:
      "A tall lighting-sculpture hybrid — vertical form, warm internal source. Replaces a floor lamp without acting like one.",
    images: [`${IMG}/CH-S28/Gemini-Generated-Image-y6dlxjy6dlxjy6dl.png`],
  },
  {
    id: "CH-S30",
    name: "Mickey Wall Portrait",
    height: 60,
    colors: "All colors",
    priceEgp: 15000,
    inStock: true,
    description:
      "A wall-mounted relief portrait — the silhouette is instantly readable, the surface is hand-finished. Designed to read clearly above eye level.",
    images: [
      `${IMG}/CH-S30/WhatsApp-Image-2026-04-29-at-7.36.22-PM.jpeg`,
    ],
  },
  {
    id: "CH-S31",
    name: "Suit Kaws",
    height: 120,
    colors: "All colors",
    priceEgp: 22500,
    inStock: true,
    description:
      "The KAWS figure dressed in a tailored suit — the same recognisable silhouette, rephrased with a more formal register.",
    images: [`${IMG}/CH-S31/28.jpg`],
  },
  {
    id: "CH-S32",
    name: "Kiddo Lighting",
    height: 60,
    colors: "All colors",
    priceEgp: 15000,
    inStock: true,
    description:
      "A small figurative lamp — child-scale form, warm light source. Sits comfortably on a side table or a bedside surface.",
    images: [`${IMG}/CH-S32/13.jpg`],
  },
  {
    id: "CH-S33",
    name: "Half Head Table",
    height: 60,
    colors: "All colors",
    priceEgp: 12500,
    inStock: true,
    description:
      "A sculptural side table — a half-head form supports a flat top. Equally at home in a residential corner or a retail vignette.",
    images: [`${IMG}/CH-S33/15.jpg`],
  },
  {
    id: "CH-S38",
    name: "Man Face Wall",
    height: 100,
    colors: "All colors",
    priceEgp: 33000,
    inStock: true,
    description:
      "A large wall-mounted face — sculpted in relief, hand-finished, sized to read as the central element of a long wall.",
    images: [
      `${IMG}/CH-S38/Gemini-Generated-Image-d3dnj0d3dnj0d3dn.png`,
      `${IMG}/CH-S38/Gemini-Generated-Image-ty8v9lty8v9lty8v.png`,
    ],
  },
];

export function getSculptureById(id: string): Sculpture | undefined {
  return SCULPTURES.find((s) => s.id === id);
}

export function getAdjacentSculptures(id: string): {
  prev: Sculpture;
  next: Sculpture;
} | null {
  const idx = SCULPTURES.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const prev = SCULPTURES[(idx - 1 + SCULPTURES.length) % SCULPTURES.length];
  const next = SCULPTURES[(idx + 1) % SCULPTURES.length];
  return { prev, next };
}

export function getOtherSculptures(id: string, count = 6): Sculpture[] {
  const idx = SCULPTURES.findIndex((s) => s.id === id);
  if (idx === -1) return SCULPTURES.slice(0, count);
  const others: Sculpture[] = [];
  for (let i = 1; i <= count; i++) {
    others.push(SCULPTURES[(idx + i) % SCULPTURES.length]);
  }
  return others;
}

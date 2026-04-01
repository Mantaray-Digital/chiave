import type {
  Door,
  ArthausPiece,
  PlaygroundItem,
  StudioImage,
} from "@/types";

// ─── The 7 Doors ───────────────────────────────────────────────────────────────

export const DOORS: Door[] = [
  {
    id: "door-1",
    number: 1,
    name: "Sculptures",
    description: "Sculptures design, fabrications and installation",
    color: "#e8712a",
    icon: "Cuboid",
  },
  {
    id: "door-2",
    number: 2,
    name: "Visual Arts",
    description: "Graphics and visuals design, posters, collages",
    color: "#2d7dd2",
    icon: "Palette",
  },
  {
    id: "door-3",
    number: 3,
    name: "Art Pieces",
    description: "Creating unique art pieces from everyday things",
    color: "#2a9d4e",
    icon: "Gem",
  },
  {
    id: "door-4",
    number: 4,
    name: "3D Printings",
    description: "Miniatures art, 3D printing models",
    color: "#e8c72a",
    icon: "Printer",
  },
  {
    id: "door-5",
    number: 5,
    name: "Scenes & Stories",
    description: "Creating stories and scenes, Unreal Engine, Blender",
    color: "#d42d7d",
    icon: "Clapperboard",
  },
  {
    id: "door-6",
    number: 6,
    name: "Characters",
    description: "Creating digital characters, digitally or physically",
    color: "#7b2dd4",
    icon: "User",
  },
  {
    id: "door-7",
    number: 7,
    name: "Animations",
    description: "Animations and video editing, After Effects, AI",
    color: "#2dc4d4",
    icon: "Film",
  },
];

// ─── Studio Images ──────────────────────────────────────────────────────────────

export const STUDIO_IMAGES: StudioImage[] = [
  {
    id: "studio-1",
    label: "Design Publication",
    image: "/images/studio/Screenshot 2026-03-26 143331.png",
  },
  {
    id: "studio-2",
    label: "Urban Vision",
    image: "/images/studio/Screenshot 2026-03-26 143404.png",
  },
  {
    id: "studio-3",
    label: "Spatial Study",
    image: "/images/studio/Screenshot 2026-03-26 143921.png",
  },
  {
    id: "studio-4",
    label: "Material Exploration",
    image: "/images/studio/Screenshot 2026-03-26 143939.png",
  },
  {
    id: "studio-5",
    label: "Interior Concept",
    image: "/images/studio/Screenshot 2026-03-26 143953.png",
  },
  {
    id: "studio-6",
    label: "Architectural Detail",
    image: "/images/studio/Screenshot 2026-03-26 144006.png",
  },
  {
    id: "studio-7",
    label: "Form Study",
    image: "/images/studio/Screenshot 2026-03-26 144021.png",
  },
  {
    id: "studio-8",
    label: "Terrain Model",
    image: "/images/studio/Screenshot 2026-03-26 144106.png",
  },
  {
    id: "studio-9",
    label: "Composition",
    image: "/images/studio/Screenshot 2026-03-26 144116.png",
  },
  {
    id: "studio-10",
    label: "Design System",
    image: "/images/studio/Screenshot 2026-03-26 144135.png",
  },
  {
    id: "studio-11",
    label: "Collection",
    image: "/images/studio/Screenshot 2026-03-26 144148.png",
  },
  {
    id: "studio-12",
    label: "Art Direction",
    image: "/images/studio/Screenshot 2026-03-26 144213.png",
  },
  {
    id: "studio-13",
    label: "KAWS Collection",
    image: "/images/studio/Screenshot 2026-03-26 144228.png",
  },
  {
    id: "studio-14",
    label: "Creative Direction",
    image: "/images/studio/Screenshot 2026-03-26 144240.png",
  },
  {
    id: "studio-15",
    label: "Vision",
    image: "/images/studio/Screenshot 2026-03-26 144257.png",
  },
];

// ─── Arthaus Pieces ─────────────────────────────────────────────────────────────

export const ARTHAUS_PIECES: ArthausPiece[] = [
  {
    id: "arthaus-1",
    number: "01",
    name: "The Half Carved Face Sink",
    description:
      "A striking sculptural sink carved from natural stone, blending raw organic texture with refined artisan craftsmanship.",
    image: "/images/arthaus/Screenshot 2026-03-26 144928.png",
    ctaText: "Explore Piece",
  },
  {
    id: "arthaus-2",
    number: "02",
    name: "Artisan Vessel",
    description:
      "Hand-shaped ceramic vessel with an earthy, tactile finish that celebrates the beauty of imperfection.",
    image: "/images/arthaus/Screenshot 2026-03-26 144936.png",
    ctaText: "Explore Piece",
  },
  {
    id: "arthaus-3",
    number: "03",
    name: "Sculptural Form",
    description:
      "An abstract sculptural form exploring the tension between mass and negative space.",
    image: "/images/arthaus/Screenshot 2026-03-26 144950.png",
    ctaText: "Explore Piece",
  },
  {
    id: "arthaus-4",
    number: "04",
    name: "Heritage Collection",
    description:
      "A curated collection of heritage-inspired objects that bridge traditional craft and contemporary design.",
    image: "/images/arthaus/Screenshot 2026-03-26 145003.png",
    ctaText: "Explore Piece",
  },
];

export const ARTHAUS_COMPACT: ArthausPiece[] = [
  {
    id: "arthaus-5",
    number: "05",
    name: "Ritual Object",
    description: "A ceremonial object inspired by ancient ritual forms.",
    image: "/images/arthaus/Screenshot 2026-03-26 145015.png",
    ctaText: "View",
  },
  {
    id: "arthaus-6",
    number: "06",
    name: "Earth Form",
    description: "Organic earth-toned sculpture shaped by natural forces.",
    image: "/images/arthaus/Screenshot 2026-03-26 145029.png",
    ctaText: "View",
  },
  {
    id: "arthaus-7",
    number: "07",
    name: "New Designs",
    description: "Fresh design explorations pushing material boundaries.",
    image: "/images/arthaus/Screenshot 2026-03-26 145042.png",
    ctaText: "View",
  },
  {
    id: "arthaus-8",
    number: "08",
    name: "Carved Stone",
    description: "Precision-carved stone piece with fluid, modern lines.",
    image: "/images/arthaus/Screenshot 2026-03-26 145058.png",
    ctaText: "View",
  },
  {
    id: "arthaus-9",
    number: "09",
    name: "Basin Series",
    description: "Functional basins reimagined as sculptural art objects.",
    image: "/images/arthaus/Screenshot 2026-03-26 145113.png",
    ctaText: "View",
  },
  {
    id: "arthaus-10",
    number: "10",
    name: "Crafted for You",
    description: "Bespoke pieces tailored to individual spaces and tastes.",
    image: "/images/arthaus/Screenshot 2026-03-26 145125.png",
    ctaText: "View",
  },
  {
    id: "arthaus-11",
    number: "11",
    name: "Studio Work",
    description: "Behind-the-scenes studio explorations and prototypes.",
    image: "/images/arthaus/Screenshot 2026-03-26 145142.png",
    ctaText: "View",
  },
];

// ─── Playground Items ───────────────────────────────────────────────────────────

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: "playground-1",
    title: "Studio Branding",
    image: "/images/playground/Screenshot 2026-03-26 145244.png",
  },
  {
    id: "playground-2",
    title: "Experiment",
    image: "/images/playground/Screenshot 2026-03-26 145255.png",
  },
  {
    id: "playground-3",
    title: "Creative Study",
    image: "/images/playground/Screenshot 2026-03-26 145304.png",
  },
  {
    id: "playground-4",
    title: "Concept",
    image: "/images/playground/Screenshot 2026-03-26 145325.png",
  },
  {
    id: "playground-5",
    title: "Exploration",
    image: "/images/playground/Screenshot 2026-03-26 145337.png",
  },
  {
    id: "playground-6",
    title: "Pre-Order Figure",
    image: "/images/playground/Screenshot 2026-03-26 145351.png",
  },
  {
    id: "playground-7",
    title: "Material Study",
    image: "/images/playground/Screenshot 2026-03-26 145417.png",
  },
  {
    id: "playground-8",
    title: "Vision",
    image: "/images/playground/Screenshot 2026-03-26 145435.png",
  },
];


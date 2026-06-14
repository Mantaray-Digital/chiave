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
    image: "/images/doors/sculptures/CH-S06/01.jpg",
  },
  {
    id: "door-2",
    number: 2,
    name: "Visual Arts",
    description: "Graphics and visuals design, posters, collages",
    color: "#2d7dd2",
    icon: "Palette",
    image: "/images/doors/visual-arts/visual-art-collection-post.jpg",
  },
  {
    id: "door-3",
    number: 3,
    name: "Art Pieces",
    description: "Creating unique art pieces from everyday things",
    color: "#2a9d4e",
    icon: "Gem",
    image: "/images/doors/art-pieces/city-tables/paris-city-table/1-paris.jpg",
  },
  {
    id: "door-4",
    number: 4,
    name: "3D Printings",
    description: "Miniatures art, 3D printing models",
    color: "#e8c72a",
    icon: "Printer",
    image: "/images/doors/3d-printing/cover-images/1.jpg",
  },
  {
    id: "door-5",
    number: 5,
    name: "Scenes & Stories",
    description: "Creating stories and scenes, Unreal Engine, Blender",
    color: "#d42d7d",
    icon: "Clapperboard",
    image: "/images/doors/scenes/harry-potter-station/02.jpg",
  },
  {
    id: "door-6",
    number: 6,
    name: "Characters",
    description: "Creating digital characters, digitally or physically",
    color: "#7b2dd4",
    icon: "User",
    image: "/images/doors/characters/urban-characters/IMG-20250914-WA0029.jpg",
  },
  {
    id: "door-7",
    number: 7,
    name: "Animations",
    description: "Animations and video editing, After Effects, AI",
    color: "#2dc4d4",
    icon: "Film",
    image: "/images/projects/main-post.jpg",
  },
];

// ─── Studio Images ──────────────────────────────────────────────────────────────
// Each entry showcases one of the seven creative disciplines (doors).
// Aspect: rendered inside an aspect-square card with object-cover, so 1:1 images
// (1080x1080+) are preferred. Tall/portrait sources are cropped center-out.

export const STUDIO_IMAGES: StudioImage[] = [
  {
    id: "studio-sculpture-1",
    label: "Sculpture — CH-S06",
    image: "/images/doors/sculptures/CH-S06/01.jpg",
    description:
      "Carved from a single block, CH-S06 explores the dialogue between weight and gesture. The piece anchors a room without dominating it — proof that presence does not require volume.",
  },
  {
    id: "studio-sculpture-2",
    label: "Sculpture — CH-S11",
    image: "/images/doors/sculptures/CH-S11/01.jpg",
    description:
      "A study in vertical poise. CH-S11 was modelled in the studio over three weeks, then translated to stone by hand. The surface keeps the trace of every chisel.",
  },
  {
    id: "studio-sculpture-3",
    label: "Sculpture — CH-S13",
    image: "/images/doors/sculptures/CH-S13/01.jpg",
    description:
      "Part of the foundational series. CH-S13 reduces the human form to its quietest silhouette, intended for spaces where stillness is the architecture.",
  },
  {
    id: "studio-visual-arts-1",
    label: "Visual Arts — Collection",
    image: "/images/doors/visual-arts/visual-art-collection-post.jpg",
    description:
      "A composite from the latest visual arts release — collage, photography and typography layered into a single editorial frame. Printed on archival cotton in limited runs.",
  },
  {
    id: "studio-visual-arts-2",
    label: "Visual Arts — Portraits",
    image: "/images/doors/visual-arts/portraits-post.jpg",
    description:
      "The Portraits series reframes classical sitters through a contemporary, almost cinematic lens. Each piece is hand-finished after print.",
  },
  {
    id: "studio-visual-arts-3",
    label: "Visual Arts — Hoodies",
    image: "/images/doors/visual-arts/hoodies-post.jpg",
    description:
      "Wearable visual art. The hoodie collection treats garments as canvases, applying the studio's print language to mid-weight black cotton.",
  },
  {
    id: "studio-art-pieces-1",
    label: "Art Pieces — Paris City Table",
    image: "/images/doors/art-pieces/city-tables/paris-city-table/1-paris.jpg",
    description:
      "A miniature Paris under glass. Streets and landmarks are hand-cut and inlaid into the tabletop, lit from within so the city glows quietly at dusk.",
  },
  {
    id: "studio-art-pieces-2",
    label: "Art Pieces — Florence City Table",
    image: "/images/doors/art-pieces/city-tables/florence-city-table/1.jpg",
    description:
      "Florence rendered as furniture. The Renaissance plan is mapped across the surface in brass inlay and walnut, tying every line back to its 15th-century origin.",
  },
  {
    id: "studio-art-pieces-3",
    label: "Art Pieces — David Head Collection",
    image: "/images/doors/art-pieces/david-head-collection/post-1.jpg",
    description:
      "Studies after Michelangelo. A series of cast and carved heads in resin, plaster and stone — each iteration changes the material, never the proportion.",
  },
  {
    id: "studio-3d-printing-1",
    label: "3D Printing — Cover I",
    image: "/images/doors/3d-printing/cover-images/1.jpg",
    description:
      "Cover frame from the 3D printing program. Files are modelled in Blender, sliced for 0.1 mm layers, then post-processed in the studio to remove every print line.",
  },
  {
    id: "studio-3d-printing-2",
    label: "3D Printing — Cover II",
    image: "/images/doors/3d-printing/cover-images/2.jpg",
    description:
      "Second cover from the same program. Where part one explores form, this one explores finish — a matte primer over PLA that reads as cast plaster.",
  },
  {
    id: "studio-scenes-1",
    label: "Scenes — Harry Potter Station",
    image: "/images/doors/scenes/harry-potter-station/02.jpg",
    description:
      "A miniature recreation of King's Cross platform 9¾, built at 1:32 scale. Lighting is fully practical; every lamp is wired and dimmable.",
  },
  {
    id: "studio-scenes-2",
    label: "Scenes — Pigeon Egypt Tower",
    image: "/images/doors/scenes/pigeon-egypt-tower/IMG-20251118-WA0108.jpg",
    description:
      "An ode to vernacular Cairo. The pigeon tower is reproduced in mud-brick texture and weathered acrylic, with hand-painted birds suspended in mid-flight.",
  },
  {
    id: "studio-characters-1",
    label: "Characters — Urban",
    image: "/images/doors/characters/urban-characters/IMG-20250914-WA0029.jpg",
    description:
      "From the Urban Characters series. A roster of street archetypes sculpted, cast and dressed by hand, each meant to feel pulled directly from a specific block of downtown Cairo.",
  },
  {
    id: "studio-projects-1",
    label: "Projects & Collabs",
    image: "/images/projects/main-post.jpg",
    description:
      "Cover image for the studio's projects archive — collaborations with brands, galleries and individual artists across the past two seasons.",
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
    image: "/images/arthaus/collections/half-carved-face/02.jpg",
    ctaText: "Explore Piece",
  },
  {
    id: "arthaus-2",
    number: "02",
    name: "Artisan Vessel",
    description:
      "Hand-shaped ceramic vessel with an earthy, tactile finish that celebrates the beauty of imperfection.",
    image: "/images/arthaus/collections/harmony/WhatsApp-Image-2024-11-28-at-02.32.21-0e2decba.jpg",
    ctaText: "Explore Piece",
  },
  {
    id: "arthaus-3",
    number: "03",
    name: "Sculptural Form",
    description:
      "An abstract sculptural form exploring the tension between mass and negative space.",
    image: "/images/arthaus/collections/standing-kid/02.jpg",
    ctaText: "Explore Piece",
  },
  {
    id: "arthaus-4",
    number: "04",
    name: "Heritage Collection",
    description:
      "A curated collection of heritage-inspired objects that bridge traditional craft and contemporary design.",
    image: "/images/arthaus/collections/bleeding-greek-01/02.jpg",
    ctaText: "Explore Piece",
  },
];

export const ARTHAUS_COMPACT: ArthausPiece[] = [
  {
    id: "arthaus-5",
    number: "05",
    name: "Ritual Object",
    description: "A ceremonial object inspired by ancient ritual forms.",
    image: "/images/arthaus/collections/terrazzo/01.jpg",
    ctaText: "View",
  },
  {
    id: "arthaus-6",
    number: "06",
    name: "Earth Form",
    description: "Organic earth-toned sculpture shaped by natural forces.",
    image: "/images/arthaus/collections/marble-mirage/10.jpg",
    ctaText: "View",
  },
  {
    id: "arthaus-7",
    number: "07",
    name: "New Designs",
    description: "Fresh design explorations pushing material boundaries.",
    image: "/images/arthaus/collections/art-deco/0.jpg",
    ctaText: "View",
  },
  {
    id: "arthaus-8",
    number: "08",
    name: "Carved Stone",
    description: "Precision-carved stone piece with fluid, modern lines.",
    image: "/images/arthaus/collections/triple-face-black/01.jpg",
    ctaText: "View",
  },
  {
    id: "arthaus-9",
    number: "09",
    name: "Basin Series",
    description: "Functional basins reimagined as sculptural art objects.",
    image: "/images/arthaus/collections/glamour-sink/01.jpg",
    ctaText: "View",
  },
  {
    id: "arthaus-10",
    number: "10",
    name: "Crafted for You",
    description: "Bespoke pieces tailored to individual spaces and tastes.",
    image: "/images/arthaus/collections/rock-ripple/01.jpg",
    ctaText: "View",
  },
  {
    id: "arthaus-11",
    number: "11",
    name: "Studio Work",
    description: "Behind-the-scenes studio explorations and prototypes.",
    image: "/images/arthaus/collections/ethreal/CHV-024.jpg",
    ctaText: "View",
  },
];

// ─── Playground Items ───────────────────────────────────────────────────────────
// Sourced from the Chivoo Playground "urbo" collection — square (1280x1280 /
// 1600x1600) images render cleanly in the playground grid's aspect-square cells.

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: "playground-urbo-1",
    title: "Urbo — I",
    image: "/images/chivoo-playground/urbo/1.jpeg",
    description:
      "Opening frame of the Urbo experiment. The series began as a sketchbook study and grew into a parallel visual vocabulary for the studio.",
  },
  {
    id: "playground-urbo-2",
    title: "Urbo — II",
    image: "/images/chivoo-playground/urbo/2.jpeg",
    description:
      "Iteration two pushes contrast and density — a deliberate overload that the rest of the series eventually tones down.",
  },
  {
    id: "playground-urbo-3",
    title: "Urbo — III",
    image: "/images/chivoo-playground/urbo/3.jpeg",
    description:
      "Geometry takes the lead. Stripped of figure and texture, the frame becomes purely architectural.",
  },
  {
    id: "playground-urbo-4",
    title: "Urbo — IV",
    image: "/images/chivoo-playground/urbo/4.jpeg",
    description:
      "A return to pigment. Layers of warm tone push back against the colder palette of the previous frames.",
  },
  {
    id: "playground-urbo-5",
    title: "Urbo — V",
    image: "/images/chivoo-playground/urbo/6.jpeg",
    description:
      "Halfway through the run. The composition opens up; negative space is allowed to do most of the talking.",
  },
  {
    id: "playground-urbo-6",
    title: "Urbo — VI",
    image: "/images/chivoo-playground/urbo/8.jpeg",
    description:
      "A breath. The studio considered ending the series here — a self-contained image that needs no neighbour.",
  },
  {
    id: "playground-urbo-7",
    title: "Urbo — VII",
    image: "/images/chivoo-playground/urbo/7.jpeg",
    description:
      "Late-stage experiment with collage. Found textures are reintroduced after being absent from the middle of the series.",
  },
  {
    id: "playground-urbo-8",
    title: "Urbo — VIII",
    image: "/images/chivoo-playground/urbo/99.jpeg",
    description:
      "Closing frame. The series resolves on a quiet, almost monochromatic note — a deliberate echo of where it started.",
  },
];


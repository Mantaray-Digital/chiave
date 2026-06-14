import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    // Run Next.js dev workers (e.g. static-paths-worker) as worker_threads
    // instead of forked child processes so that worker exceptions surface
    // their actual stack trace instead of the generic
    // "Jest worker encountered N child process exceptions" message.
    workerThreads: true,
  },
  images: {
    // Memory-conscious settings — the production server runs on a 512 MB
    // instance (Render). The on-demand image optimizer (sharp) decodes the
    // source image per request, so anything that lowers per-request memory
    // directly reduces OOM risk. See node_modules/next/dist/docs/01-app/
    // 03-api-reference/02-components/image.md.

    // WebP only. AVIF encoding takes ~50% longer and far more memory than
    // WebP for ~20% extra compression — not worth the OOM risk on 0.5 GB.
    formats: ["image/webp"],
    // Allowed quality values (required since Next 16). Components use the default.
    qualities: [75],
    // Source images are capped at 2048 px (scripts/optimize-images.mjs), so a
    // 3840 device-size variant is wasted optimizer work — drop it.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Guard against pathologically large source fetches OOMing the decoder.
    // NOTE: this also bounds REMOTE images (Convex shop product photos), whose
    // sizes we don't control — keep generous headroom so it can't 400 a normal
    // product upload. Local art images are already ≤1.7 MB after optimization.
    maximumResponseBody: 10_000_000,
    // Keep optimized images cached longer so repeat requests are served from
    // disk rather than re-running sharp (less repeated memory pressure).
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fast-jaguar-540.convex.cloud",
      },
    ],
  },
};

export default nextConfig;

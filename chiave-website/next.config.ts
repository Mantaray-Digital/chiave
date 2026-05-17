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
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fast-jaguar-540.convex.cloud",
      },
    ],
  },
};

export default nextConfig;

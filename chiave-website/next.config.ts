import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Type and lint errors now block the build — the repo is clean, keep it that way.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

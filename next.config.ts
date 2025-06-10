import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "belediyetostbangstorage.blob.core.windows.net",
      },
    ],

  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb"
    },
  },
};

export default nextConfig;


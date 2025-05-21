import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "belediyetostbangstorage.blob.core.windows.net",
      },
    ],

  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    },
  },
};

export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;

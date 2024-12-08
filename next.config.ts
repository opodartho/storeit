import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

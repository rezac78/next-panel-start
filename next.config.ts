import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
     {
      protocol: "http",
      hostname: "localhost",
      port: "3000",
      pathname: "/uploads/**",
    },
    ],
  },
};

export default nextConfig;

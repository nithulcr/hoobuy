import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pink-sheep-929430.hostingersite.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  
};

export default nextConfig;

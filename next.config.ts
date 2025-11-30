import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  distDir: '.next',

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('validator');
    }
    return config;
  },
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; hoobuy;",
  },
};

export default nextConfig;
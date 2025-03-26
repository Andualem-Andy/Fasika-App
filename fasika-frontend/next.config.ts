import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 1 day
    domains: ['localhost', 'fasikachildcare.com'],
  },
  experimental: {
    optimizePackageImports: ['@heroicons/react']
  }
};

export default nextConfig;

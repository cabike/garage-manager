import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ['localhost'],
    unoptimized: true, // For static export if needed
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Only for initial deployment
  },
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
};

export default nextConfig;

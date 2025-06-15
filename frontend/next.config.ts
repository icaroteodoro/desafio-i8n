import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['loremflickr.com'],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "loremflickr.com",
        pathname: "/640/480/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        pathname: "/640/480/**",
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**'
      }
    ],
  },
};

export default nextConfig;

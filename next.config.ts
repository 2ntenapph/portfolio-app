import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', 
  serverRuntimeConfig: {
    PORT: process.env.PORT || 3000,
  },
};

export default nextConfig;

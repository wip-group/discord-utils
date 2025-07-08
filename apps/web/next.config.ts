import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

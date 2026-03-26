import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/timotion-diagnostic",
  images: { unoptimized: true },
};

export default nextConfig;

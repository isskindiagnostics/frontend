import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();
const nextConfig: NextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.html$/i,
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default withVanillaExtract(nextConfig);

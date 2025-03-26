/** @type {import('next').NextConfig} */
const createMDX = require("@next/mdx");

const withMDX = createMDX({
  options: {
    // providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors:
      process.env.ENVIRONMENT === "production" ||
      process.env.ENVIRONMENT === "test",
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    mdxRs: true,
    // optimizeCss: true,
    // removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      { hostname: "d2sa15fzpcbn0k.cloudfront.net" },
      { hostname: "daxv8eiot4y5y.cloudfront.net" },
      { hostname: "media.getrightproperty.com" },
      { hostname: "img.youtube.com" },
      { hostname: "images.unsplash.com" },
      {
        hostname:
          "getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "getrightproperty-prod-bucket.s3.ap-south-1.amazonaws.com",
      },
      {
        hostname: "d24ksaw8earfo7.cloudfront.net",
      },
      {
        hostname: "d24ksaw8earfo7.cloudfront.net",
      },
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV || process.env.NODE_ENV || "development",
  },
  staticPageGenerationTimeout: 180,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    if (!isServer) {
      config.resolve.fallback = {
        dns: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

module.exports = withMDX(nextConfig);

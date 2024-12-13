/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  // output: "export",
  // eslint: {
  //   dirs: ["app", "components", "lib", "pages", "styles"],
  // },

  // typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    // ppr: true,
  },
  images: {
    // unoptimized: true,
    // imageSizes: [
    //   32,    // Small icons
    //   256,   // Medium images
    //   1024,  // Standard large images
    //   2048,  // Very high resolution for large displays
    // ],
    // loader: "custom",
    // loaderFile: "./cdnimages.js",

    // deviceSizes: [
    //   300,
    //   450, // Tablets
    //   1280, // Standard laptops
    //   1600,
    //   3840, // 4K displays
    // ],

    // minimumCacheTTL: 60 * 100,

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
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;

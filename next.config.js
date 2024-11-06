/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // eslint: {
  //   dirs: ["app", "components", "lib", "pages", "styles"],
  // },

  typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    // ppr: true,
  },
  images: {
    imageSizes: [
      32,    // Small icons
      256,   // Medium images
      1024,  // Standard large images
      2048,  // Very high resolution for large displays
    ],
    deviceSizes: [
      320,   // Small mobile devices
      768,   // Tablets
      1280,  // Standard laptops
      3840,  // 4K displays
    ],
    
    // minimumCacheTTL: 60 * 100,
    remotePatterns: [
      { hostname: "d2l0lb5gc1bw3t.cloudfront.net" },
      { hostname: "daxv8eiot4y5y.cloudfront.net" },
      {hostname:"media.getrightproperty.com"},
      {hostname:"img.youtube.com"},
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

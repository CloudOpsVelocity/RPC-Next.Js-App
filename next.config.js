/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  // eslint: {
  //   dirs: ["app", "components", "lib", "pages", "styles"],
  // },

  // typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    // ppr: true,
  },
  images: {
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

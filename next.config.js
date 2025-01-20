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
    // cpus

    // ppr: true,
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

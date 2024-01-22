/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      { hostname: "d1l03fubsuphsh.cloudfront.net" },
      { hostname: "s3-media0.fl.yelpcdn.com" },
      { hostname: "assets.thesparksite.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "imagesrpc.s3.ap-south-1.amazonaws.com" },
      { hostname: "imagesrpc.s3.ap-south-1.amazonaws.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
  env: {
    APP_ENV: process.env.APP_ENV || process.env.NODE_ENV || "development",
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      { hostname: "d1l03fubsuphsh.cloudfront.net" },
      { hostname: "s3-media0.fl.yelpcdn.com" },
      { hostname: "assets.thesparksite.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

module.exports = nextConfig;

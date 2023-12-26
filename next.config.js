/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  images: {
    remotePatterns: [
      { hostname: "d1l03fubsuphsh.cloudfront.net" },
      { hostname: "s3-media0.fl.yelpcdn.com" },
      { hostname: "assets.thesparksite.com" },
    ],
  },
};

module.exports = nextConfig;

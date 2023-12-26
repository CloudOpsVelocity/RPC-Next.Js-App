/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          { hostname: "d1l03fubsuphsh.cloudfront.net" },
        ],
      },
}

module.exports = nextConfig

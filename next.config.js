/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
    images: {
        remotePatterns: [
          { hostname: "d1l03fubsuphsh.cloudfront.net" },
        ],
      },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true, // 跳过类型检查
  },
  eslint: {
    ignoreDuringBuilds: true, // 跳过 ESLint 检查
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qone.kuz7.com',
      },
    ],
  },
}

module.exports = nextConfig


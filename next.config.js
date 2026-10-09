/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 隐藏本地预览左下角的 Next.js 开发指示器。
  devIndicators: false,
  // 不让本地预览自动生成与仓库无关的 AGENTS.md。
  agentRules: false,
  // 将构建和文件追踪限制在官网项目，避免误读用户目录中的其他锁文件。
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
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


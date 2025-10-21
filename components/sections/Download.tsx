'use client'

import { motion } from 'framer-motion'
import { Download as DownloadIcon, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function Download() {
  return (
    <section className="section-padding relative overflow-hidden bg-black">
      {/* Background decoration - 白色模糊光晕 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gray-100 rounded-full blur-3xl" />
      </div>
      
      {/* 顶部柔和过渡 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="container-custom mx-auto relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-primary/30">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-medium text-accent">用户好评如潮</span>
                </div>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                立即下载
                <br />
                <span className="gradient-text">EveryTalk</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 mb-8"
              >
                支持 Android 8.0 及以上版本，完全开源，MIT协议，永久免费
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4">
                <a 
                  href="https://github.com/roseforljh/EveryTalk/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="gap-2 group w-full sm:w-auto">
                    <DownloadIcon className="w-5 h-5 group-hover:animate-bounce" />
                    前往 GitHub Releases 下载
                  </Button>
                </a>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <a 
                    href="https://github.com/roseforljh/EveryTalk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <span>📦 查看源代码</span>
                  </a>
                  <div className="w-px h-4 bg-gray-700" />
                  <a 
                    href="https://github.com/roseforljh/EveryTalk/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <span>📋 所有版本</span>
                  </a>
                </div>
              </motion.div>

              {/* Features list */}
              <motion.div variants={fadeInUp} className="mt-12 space-y-4">
                {[
                  '✓ 完全开源，代码透明',
                  '✓ 支持多种AI模型接入',
                  '✓ 本地+云端混合使用',
                  '✓ 社区驱动，持续更新',
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-gray-300 hover:text-accent transition-colors duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    {feature}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* GitHub Card */}
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative glass-strong rounded-3xl p-8 flex flex-col items-center justify-center">
                {/* GitHub Logo */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 border border-primary/30">
                  <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">开源项目</h3>
                <p className="text-gray-400 text-center mb-6 max-w-xs">
                  访问 GitHub 仓库获取最新版本、查看源代码和贡献项目
                </p>

                <a 
                  href="https://github.com/roseforljh/EveryTalk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg glass border border-primary/30 hover:bg-primary/10 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="text-white group-hover:text-primary transition-colors">访问 GitHub</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Decorative elements - 白色模糊 */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white opacity-10 blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gray-100 opacity-10 blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


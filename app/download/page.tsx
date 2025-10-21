'use client'

import { motion } from 'framer-motion'
import { 
  Download as DownloadIcon, 
  Star, 
  Shield,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import VersionHistory from '@/components/sections/VersionHistory'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function DownloadPage() {
  const systemRequirements = [
    { label: '操作系统', value: 'Android 8.0 或更高版本' },
    { label: '处理器', value: 'ARM64 或 x86_64' },
    { label: '内存', value: '至少 2GB RAM' },
    { label: '存储空间', value: '至少 100MB 可用空间' },
  ]


  const features = [
    { icon: Shield, text: '安全可靠，无需担心' },
    { icon: Zap, text: '快速安装，即刻使用' },
    { icon: CheckCircle, text: '完全免费，无广告' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gray-200 rounded-full blur-3xl" />
        </div>

        <div className="container-custom mx-auto relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <motion.div variants={fadeInUp}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">用户评分 4.9/5.0</span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-6xl font-bold mb-6"
                >
                  立即下载
                  <br />
                  <span className="gradient-text">EveryTalk</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-gray-400 mb-8"
                >
                  适用于 Android 8.0 及以上系统，完全免费，无广告，无内购
                </motion.p>

              <motion.div variants={fadeInUp} className="space-y-4 mb-8">
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
                    <span>⭐ Star 项目</span>
                  </a>
                  <div className="w-px h-4 bg-gray-700" />
                  <a 
                    href="https://github.com/roseforljh/EveryTalk/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <span>📋 查看所有版本</span>
                  </a>
                </div>
              </motion.div>

                {/* Features */}
                <motion.div variants={fadeInUp} className="space-y-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      {feature.text}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right - GitHub Info */}
              <motion.div variants={fadeInUp}>
                <Card glowing className="p-8">
                  <div className="flex flex-col items-center">
                    {/* GitHub Logo */}
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 border border-primary/30">
                      <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">开源下载</h3>
                    <p className="text-gray-400 text-center mb-6">
                      从 GitHub Releases 获取最新版本
                    </p>

                    <a 
                      href="https://github.com/roseforljh/EveryTalk/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-lg glass border border-primary/30 hover:bg-primary/10 transition-all duration-300"
                    >
                      查看所有版本
                    </a>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="section-padding bg-dark-bg-secondary/50">
        <div className="container-custom mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              <span className="gradient-text">系统要求</span>
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Card className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {systemRequirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 rounded-xl glass"
                    >
                      <div className="text-sm text-gray-400">{req.label}</div>
                      <div className="text-lg font-semibold text-white">
                        {req.value}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Version History - 从 GitHub 实时获取 */}
      <VersionHistory />

      {/* Warning Notice */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    安全提示
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    请从官方渠道下载应用，确保设备安全。首次安装可能需要在系统设置中允许"安装未知来源应用"。我们承诺应用不含任何恶意代码，并会定期更新安全证书。
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


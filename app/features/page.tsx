'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Shield, 
  Sparkles, 
  Smartphone, 
  Cloud,
  MessageSquare,
  Camera,
  Mic,
  Image as ImageIcon,
  FileText,
  Lock
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'
import Link from 'next/link'

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI智能引擎',
      description: '采用最新的深度学习算法，提供前所未有的智能体验',
      details: [
        '先进的神经网络架构',
        '实时学习与优化',
        '个性化推荐系统',
        '智能预测功能',
      ],
      gradient: 'from-primary to-primary-light',
    },
    {
      icon: Zap,
      title: '极速性能',
      description: '优化的性能引擎，让每一次交互都如丝般顺滑',
      details: [
        '毫秒级响应速度',
        '智能资源管理',
        '后台任务优化',
        '省电模式支持',
      ],
      gradient: 'from-secondary to-secondary-light',
    },
    {
      icon: Shield,
      title: '安全隐私',
      description: '端到端加密，您的数据安全是我们的首要任务',
      details: [
        '军事级加密技术',
        '本地数据处理',
        '隐私保护模式',
        '安全审计机制',
      ],
      gradient: 'from-primary to-accent',
    },
  ]

  const additionalFeatures = [
    { icon: MessageSquare, title: '智能对话', description: '自然流畅的AI对话体验', color: 'text-primary' },
    { icon: Camera, title: '图像识别', description: '强大的视觉识别能力', color: 'text-secondary' },
    { icon: Mic, title: '语音助手', description: '准确的语音识别与合成', color: 'text-accent' },
    { icon: ImageIcon, title: '图像生成', description: 'AI驱动的创意生成', color: 'text-primary' },
    { icon: FileText, title: '文本处理', description: '智能文本分析与生成', color: 'text-secondary' },
    { icon: Lock, title: '数据加密', description: '全方位的数据保护', color: 'text-accent' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200 rounded-full blur-3xl" />
        </div>

        <div className="container-custom mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto mb-20"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-primary/30"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent">强大功能</span>
          </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">为您而生</span>
              <br />
              <span className="text-white">智能无限</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-400"
            >
              探索我们精心打造的每一个功能，让AI真正为您服务
            </motion.p>
          </motion.div>

          {/* Main Features */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
              >
                <Card glowing hoverable className="h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Features Grid */}
          <motion.div
            className="mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              <span className="gradient-text">更多精彩功能</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                >
                  <Card hoverable className="h-full group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="glass-strong rounded-3xl p-12 max-w-3xl mx-auto"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                准备好体验了吗？
              </h3>
              <p className="text-xl text-gray-400 mb-8">
                立即下载，开启您的AI智能之旅
              </p>
              <Link href="/download">
                <Button size="lg" className="gap-2">
                  <Smartphone className="w-5 h-5" />
                  立即下载
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


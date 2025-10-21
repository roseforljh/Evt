'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Shield, Sparkles, Smartphone, Cloud } from 'lucide-react'
import Card from '@/components/ui/Card'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: '多模型支持',
      description: '支持OpenAI、Gemini、Claude等主流AI模型，还可接入本地模型',
      gradient: 'from-primary to-primary-light',
    },
    {
      icon: Zap,
      title: '流式对话',
      description: '实时流式响应，获得流畅的对话体验，支持打字机效果',
      gradient: 'from-secondary to-secondary-light',
    },
    {
      icon: Shield,
      title: '完全开源',
      description: 'MIT开源协议，代码透明，社区驱动，随时可审查和贡献',
      gradient: 'from-primary to-accent',
    },
    {
      icon: Sparkles,
      title: '联网搜索',
      description: '集成联网搜索功能，让AI获取实时信息，回答更准确',
      gradient: 'from-accent to-secondary',
    },
    {
      icon: Smartphone,
      title: '图像生成',
      description: '支持AI图像生成与编辑，文生图、图生图轻松实现',
      gradient: 'from-secondary to-primary',
    },
    {
      icon: Cloud,
      title: '多模态输入',
      description: '支持文字、图片、音频、文档等多种输入方式',
      gradient: 'from-primary to-secondary',
    },
  ]

  return (
    <section className="section-padding relative bg-gradient-to-b from-black via-black to-black">
      {/* 顶部柔和过渡 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
      
      <div className="container-custom mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">强大功能</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            高度可定制的开源AI聊天客户端，提供极致的灵活性和流畅的对话体验
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card glowing hoverable className="h-full group">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover effect line */}
                  <div className="mt-auto pt-6">
                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


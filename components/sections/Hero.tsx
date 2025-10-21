'use client'

import { motion } from 'framer-motion'
import { Download, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import AnimatedText, { TypingText } from '@/components/ui/AnimatedText'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-5 pointer-events-none" />
      
      <div className="container-custom mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Badge - 太极主题 */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-primary/30"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-200">阴阳调和 · AI技术驱动</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-poppins"
          >
            <span className="gradient-text">EveryTalk</span>
            <br />
            <span className="text-white">开源AI聊天助手</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={fadeInUp} className="mb-12">
            <TypingText
              text="高度可定制 · 多模型支持 · 完全开源"
              className="text-xl md:text-2xl text-gray-400"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/download">
              <Button size="lg" className="gap-2 group">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                立即下载
              </Button>
            </Link>
            
            <Link href="/features">
              <Button size="lg" variant="outline" className="gap-2">
                <Zap className="w-5 h-5" />
                探索功能
              </Button>
            </Link>
          </motion.div>

          {/* GitHub Stats - 真实数据 */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 flex flex-wrap justify-center items-center gap-6"
          >
            <a 
              href="https://github.com/roseforljh/EveryTalk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-full hover:bg-primary/10 hover:border-primary/50 border border-primary/30 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="text-gray-400 group-hover:text-primary transition-colors">⭐ GitHub Stars:</span>
              <span className="font-bold gradient-text">93+</span>
            </a>
            
            <div className="glass px-6 py-3 rounded-full flex items-center gap-2 border border-secondary/30">
              <span className="text-gray-400">🔓 开源协议:</span>
              <span className="font-bold text-accent">MIT</span>
            </div>
            
            <a 
              href="https://github.com/roseforljh/EveryTalk/network/members" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-full hover:bg-primary/10 hover:border-primary/50 border border-primary/30 transition-all duration-300 flex items-center gap-2 group"
            >
              <span className="text-gray-400 group-hover:text-primary transition-colors">🤝 Forks:</span>
              <span className="font-bold gradient-text">12+</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/70 flex items-start justify-center p-2 backdrop-blur-sm bg-black/20">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}


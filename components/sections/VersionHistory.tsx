'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Tag } from 'lucide-react'
import Card from '@/components/ui/Card'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface GitHubRelease {
  tag_name: string
  name: string
  published_at: string
  body: string
  prerelease: boolean
  html_url: string
}

export default function VersionHistory() {
  const [releases, setReleases] = useState<GitHubRelease[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // 获取 GitHub Releases
    fetch('https://api.github.com/repos/roseforljh/EveryTalk/releases')
      .then(res => res.json())
      .then(data => {
        // 只取最新的 3 个版本
        setReleases(data.slice(0, 3))
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch releases:', err)
        setError(true)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const getVersionType = (version: string, prerelease: boolean) => {
    if (prerelease) return '预发布版本'
    if (version.includes('beta')) return '测试版'
    if (version.includes('alpha')) return '内测版'
    return '稳定版'
  }

  const parseChangelog = (body: string) => {
    // 解析 Markdown 格式的更新日志
    const lines = body.split('\n').filter(line => line.trim())
    const changes: string[] = []
    
    for (const line of lines) {
      // 匹配列表项: - 或 * 开头
      if (line.match(/^[\-\*]\s+/)) {
        changes.push(line.replace(/^[\-\*]\s+/, '').trim())
      }
      // 匹配数字列表: 1. 2. 等
      else if (line.match(/^\d+\.\s+/)) {
        changes.push(line.replace(/^\d+\.\s+/, '').trim())
      }
      // 如果是普通文本且不是标题，也加入
      else if (!line.startsWith('#') && line.length > 0 && line.length < 100) {
        changes.push(line.trim())
      }
    }
    
    // 如果没有解析到内容，返回原始body的前几行
    if (changes.length === 0) {
      return body.split('\n').filter(l => l.trim()).slice(0, 4)
    }
    
    return changes.slice(0, 4) // 最多显示4条
  }

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-400">加载版本信息中...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || releases.length === 0) {
    return (
      <section className="section-padding">
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
              <span className="gradient-text">版本历史</span>
            </motion.h2>

            <div className="text-center text-gray-400">
              <p>暂时无法加载版本信息</p>
              <a 
                href="https://github.com/roseforljh/EveryTalk/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary hover:text-primary-light transition-colors"
              >
                访问 GitHub Releases 查看 →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
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
            <span className="gradient-text">版本历史</span>
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {releases.map((release, index) => (
              <motion.div key={release.tag_name} variants={fadeInUp}>
                <a 
                  href={release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card hoverable className="hover:border-primary/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Version Info */}
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="w-5 h-5 text-primary" />
                          <div className="text-2xl font-bold gradient-text">
                            {release.tag_name}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                          <Clock className="w-4 h-4" />
                          {formatDate(release.published_at)}
                        </div>
                        
                        <div className="inline-block px-3 py-1 rounded-full glass text-xs">
                          {getVersionType(release.tag_name, release.prerelease)}
                        </div>

                        {index === 0 && (
                          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-black text-xs font-bold">
                            ✨ 最新版本
                          </div>
                        )}
                      </div>

                      {/* Changes */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          {release.name || '更新内容'}
                        </h4>
                        <ul className="space-y-2">
                          {parseChangelog(release.body).map((change, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-gray-300 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>

          {/* View All Releases Link */}
          <motion.div variants={fadeInUp} className="text-center mt-8">
            <a 
              href="https://github.com/roseforljh/EveryTalk/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors group"
            >
              <span>查看所有版本</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


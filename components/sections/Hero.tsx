'use client'

import { useLanguage } from '@/components/ui/LanguageProvider'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'

const PixelPenguin = dynamic(() => import('@/components/3d/PixelPenguin'), {
  ssr: false,
})

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="hero site-container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-pixel" />
          {t(' 开源 ANDROID AI 客户端')}
        </p>
        <h1 id="hero-title">
          {t('让对话，')}
          <br />
          {t('自由发生')}
          <span className="title-dot">.</span>
        </h1>
        <p className="hero-description">
          {t('模型由你选择。想法不设边界。')}
          <br />
          {t('把聊天、搜索和创作，装进口袋。')}
        </p>
        <div className="actions">
          <Link href="/#download" className="action-primary">
            <Download size={18} />
            {t(' 下载 EveryTalk ')}
            <ArrowUpRight size={18} />
          </Link>
          <a
            href="https://github.com/roseforljh/EveryTalk"
            className="action-quiet"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('查看源码 ')}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="hero-facts">
          <span>Android 8.1+</span>
          <span>{t('多模型接入')}</span>
          <span>{t('开源 · MIT')}</span>
        </div>
      </div>
      <div className="hero-visual">
        <span className="visual-corner corner-top" />
        <span className="visual-corner corner-bottom" />
        <PixelPenguin />
      </div>
      <a href="#features" className="hero-scroll">
        <ArrowDown size={15} />
        <span>{t('向下探索')}</span>
        <span className="hero-scroll-line" />
      </a>
    </section>
  )
}

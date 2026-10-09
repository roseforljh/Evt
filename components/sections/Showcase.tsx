'use client'

import { useLanguage } from '@/components/ui/LanguageProvider'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollExpand from '@/components/ui/ScrollExpand'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HoloCard from '@/components/ui/HoloCard'

const slides = [
  {
    src: '/showcase/models.png',
    title: '你的模型，你的节奏。',
    label: '模型与参数',
    description: '选择模型、调整参数，把每一轮对话变成适合自己的工作方式。',
  },
  {
    src: '/showcase/conversations.png',
    title: '每次讨论，都有位置。',
    label: '会话管理',
    description: '整理不同主题的会话，把想法留在该在的地方。',
  },
  {
    src: '/showcase/markdown.png',
    title: '复杂内容，也能读得轻松。',
    label: 'Markdown 与公式',
    description: '从代码片段到数学公式，让模型的回答保持清晰。',
  },
  {
    src: '/showcase/tools.png',
    title: '工具能力，随手调用。',
    label: '搜索与 MCP',
    description: '图片、附件、联网搜索与 MCP，把更多信息带进对话。',
  },
  {
    src: '/showcase/image-generation.png',
    title: '把脑海里的画面，做出来。',
    label: '图像生成',
    description: '用文字描述创意，在聊天之外，继续探索图像。',
  },
]

/** 复用五张宣传图，保留切换和查看完整原图；录屏准备好后可替换展示媒体。 */
export default function Showcase() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const slide = slides[active]
  return (
    <section id="showcase" className="showcase section-space site-container">
      <div className="section-heading">
        <p className="eyebrow">{t('看看它能做什么')}</p>
        <ScrollReveal>{t('从对话，到创造。')}</ScrollReveal>
        <p>{t('五个侧面，同一个 EveryTalk。')}</p>
      </div>
      <div
        className="showcase-tabs"
        role="group"
        aria-label={t('选择产品展示')}
      >
        {slides.map((item, index) => (
          <button
            type="button"
            key={item.src}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            {t(item.label)}
          </button>
        ))}
      </div>
      <ScrollExpand>
        <div className="showcase-panel">
          <div className="showcase-copy" aria-live="polite">
            <span className="mono-label">EVERYTALK / {t(slide.label)}</span>
            <h3>{t(slide.title)}</h3>
            <p>{t(slide.description)}</p>
            <a
              href={slide.src}
              target="_blank"
              rel="noopener noreferrer"
              className="action-quiet"
            >
              {t('查看完整宣传图 ')}
              <ArrowRight size={16} />
            </a>
            <div className="showcase-controls">
              <button
                type="button"
                aria-label={t('上一张宣传图')}
                onClick={() =>
                  setActive((active + slides.length - 1) % slides.length)
                }
              >
                <ArrowLeft size={19} />
              </button>
              <span className="mono-label">
                {String(active + 1).padStart(2, '0')} / 05
              </span>
              <button
                type="button"
                aria-label={t('下一张宣传图')}
                onClick={() => setActive((active + 1) % slides.length)}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
          <div className="showcase-media">
            <HoloCard
              image={slide.src}
              alt={`EveryTalk / ${t(slide.label)}`}
              preset="glitter"
              intensity={0.24}
              edgeSparkle={0.65}
              frame={2}
              glare={0.15}
              tiltMax={10}
              hoverScale={1.025}
              width={343}
              radius={12}
              className="showcase-holo"
            />
          </div>
        </div>
      </ScrollExpand>
    </section>
  )
}

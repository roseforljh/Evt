'use client'

import { useLanguage } from '@/components/ui/LanguageProvider'

import {
  ArrowUpRight,
  SlidersHorizontal,
  Globe,
  Image as ImageIcon,
  MessageSquareText,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ModelConnections from '@/components/sections/ModelConnections'

const capabilities = [
  {
    icon: SlidersHorizontal,
    title: '模型，自己选。',
    label: 'MULTI-MODEL',
    description:
      '连接 OpenAI、Gemini、Claude 与兼容接口。服务地址、模型和参数，由你设置。',
    tags: ['自由接入', '参数控制'],
  },
  {
    icon: Globe,
    title: '对话，连接世界。',
    label: 'SEARCH & MCP',
    description:
      '联网搜索、图片与附件输入，以及 MCP 工具。需要更多信息时，让对话向外延伸。',
    tags: ['联网搜索', 'MCP 扩展'],
  },
  {
    icon: ImageIcon,
    title: '想法，变成画面。',
    label: 'IMAGE GENERATION',
    description: '从文字描述到图像创作，在同一个应用里切换聊天与图像生成。',
    tags: ['图像生成', '多模态输入'],
  },
  {
    icon: MessageSquareText,
    title: '内容，好好呈现。',
    label: 'READ & ORGANIZE',
    description:
      'Markdown、代码和公式清晰排版。分组与管理会话，找回值得继续的那次讨论。',
    tags: ['Markdown / 公式', '会话管理'],
  },
]

export default function Features() {
  const { t } = useLanguage()
  return (
    <section
      id="features"
      className="capabilities section-space site-container"
    >
      <div className="section-heading">
        <p className="eyebrow">{t('你的日常，不止问答')}</p>
        <ScrollReveal>{t('一个入口，更多可能。')}</ScrollReveal>
        <p>{t('从一个问题出发，到你想做的下一件事。')}</p>
      </div>
      <ModelConnections />
      <div className="capability-grid">
        {capabilities.map(({ icon: Icon, title, label, description, tags }) => (
          <article key={label} className="capability">
            <div className="capability-top">
              <Icon size={24} strokeWidth={1.4} />
              <span className="mono-label">{label}</span>
              <ArrowUpRight size={16} />
            </div>
            <h3>{t(title)}</h3>
            <p>{t(description)}</p>
            <div className="capability-tags">
              {tags.map((tag) => (
                <span key={tag}>{t(tag)}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="capability-note">
        {t('模型与工具的可用范围，取决于你连接的服务。')}
      </p>
    </section>
  )
}

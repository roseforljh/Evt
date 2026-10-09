'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeProvider'
import {
  CodeXml,
  Download,
  GalleryHorizontal,
  House,
  Layers,
  SquareTerminal,
} from 'lucide-react'
import { Dock, DockIcon } from '@/components/ui/Dock'
import GlassSurface from '@/components/ui/GlassSurface'
import { LanguageToggle, useLanguage } from '@/components/ui/LanguageProvider'

const links = [
  { label: '首页', href: '/#main-content', icon: House },
  { label: '功能', href: '/#features', icon: Layers },
  { label: '技术', href: '/#ecosystem', icon: SquareTerminal },
  { label: '体验', href: '/#showcase', icon: GalleryHorizontal },
  { label: '下载', href: '/#download', icon: Download },
]

/** 品牌、原 Dock 导航和设置合并为一个顶部玻璃容器，手机在容器内分为两排。 */
export default function Header() {
  const { t } = useLanguage()
  return (
    <header className="site-header">
      <nav aria-label={t('主导航')}>
        <Dock className="header-inner" iconMagnification={54}>
          {/* 复用原底部玻璃效果；内容不进入滤镜层，避免图标、文字和焦点被折射。 */}
          <div className="dock-glass" aria-hidden="true">
            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={18}
              backgroundOpacity={0.44}
              displace={1.2}
            />
          </div>
          <Link href="/" className="brand" aria-label={t('EveryTalk 首页')}>
            <Image
              src="/everytalk-logo-source.png"
              width={42}
              height={42}
              alt=""
              className="brand-image"
              preload
            />
            <span>
              EveryTalk<span className="brand-period">.</span>
            </span>
          </Link>
          {links.map(({ label, href, icon: Icon }) => (
            <DockIcon key={href}>
              <a href={href} className="dock-link" aria-label={t(label)}>
                <Icon aria-hidden="true" strokeWidth={1.6} />
                <span className="dock-label" aria-hidden="true">
                  {t(label)}
                </span>
              </a>
            </DockIcon>
          ))}
          <div className="dock-divider" aria-hidden="true" />
          <DockIcon>
            <a
              href="https://github.com/roseforljh/EveryTalk"
              className="dock-link"
              aria-label={t('查看源码（在新标签页打开）')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeXml aria-hidden="true" strokeWidth={1.6} />
              <span className="dock-label" aria-hidden="true">
                {t('源码')}
              </span>
            </a>
          </DockIcon>
          <div className="header-actions">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </Dock>
      </nav>
    </header>
  )
}

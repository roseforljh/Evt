'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 改编自 React Bits ScrollReveal；Copyright (c) 2026 David Haz，许可见设计文档。
/** 中文按字符渐显；只清理自身 GSAP 上下文，不影响页面其他滚动动画。 */
export default function ScrollReveal({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  const host = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const words = host.current?.querySelectorAll('.reveal-word')
        if (!words) return
        gsap.fromTo(
          words,
          { opacity: 0.35, filter: 'blur(1.5px)', y: 10 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            stagger: 0.045,
            ease: 'none',
            scrollTrigger: {
              trigger: host.current,
              start: 'top 88%',
              end: 'top 48%',
              // 让文字在滚轮停下后用短暂缓冲收敛，避免与瞬时位移硬绑定。
              scrub: 0.4,
            },
          },
        )
      },
      host,
    )
    return () => media.revert()
  }, [children])
  return (
    <h2
      ref={host}
      className={`scroll-reveal ${className}`}
      aria-label={children}
    >
      <span aria-hidden="true">
        {Array.from(children).map((word, index) => (
          <span className="reveal-word" key={index}>
            {word === ' ' ? '\u00a0' : word}
          </span>
        ))}
      </span>
    </h2>
  )
}

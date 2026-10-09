'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

/**
 * 用 Lenis 给桌面滚轮增加轻微惯性，让区块移动连续；触摸、键盘和减少动画仍走浏览器原生滚动。
 * 这个组件只负责滚动时间轴，不接管锚点内容或业务状态。
 */
export default function SmoothScroll() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    gsap.registerPlugin(ScrollTrigger)
    let lenis: Lenis | null = null
    let frame = 0
    let anchorFrame = 0
    let disposed = false
    const initialHash = window.location.hash
    const updateScrollTrigger = () => ScrollTrigger.update()
    const raf = (time: number) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      lenis?.off('scroll', updateScrollTrigger)
      lenis?.destroy()
      lenis = null
    }
    const updatePreference = () => {
      stop()
      if (motion.matches) return
      lenis = new Lenis({
        autoRaf: false,
        // 当前 Lenis 会读取 CSS scroll-padding-top，避免再次添加偏移造成双倍留白。
        anchors: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      })
      lenis.on('scroll', updateScrollTrigger)
      frame = requestAnimationFrame(raf)
    }
    // 访问期间修改系统偏好时也销毁实例，立即恢复原生滚动。
    motion.addEventListener('change', updatePreference)
    updatePreference()

    // 从子页面带锚点进入时，浏览器可能先定位、再被字体加载或 ScrollTrigger 刷新打断。
    // 只在首次加载完成后对齐当前锚点；普通滚轮和后续页面内导航不经过这里。
    const alignInitialAnchor = () => {
      void document.fonts.ready.then(() => {
        if (disposed) return
        anchorFrame = requestAnimationFrame(() => {
          if (window.location.hash !== initialHash) return
          let id: string
          try {
            id = decodeURIComponent(initialHash.slice(1))
          } catch {
            return
          }
          const target = document.getElementById(id)
          if (!target) return
          ScrollTrigger.refresh()
          if (lenis) {
            lenis.resize()
            lenis.scrollTo(target, { immediate: true })
          } else {
            target.scrollIntoView({ behavior: 'instant', block: 'start' })
          }
        })
      })
    }
    if (initialHash) {
      if (document.readyState === 'complete') alignInitialAnchor()
      else window.addEventListener('load', alignInitialAnchor, { once: true })
    }

    return () => {
      disposed = true
      cancelAnimationFrame(anchorFrame)
      window.removeEventListener('load', alignInitialAnchor)
      motion.removeEventListener('change', updatePreference)
      stop()
    }
  }, [])

  return null
}

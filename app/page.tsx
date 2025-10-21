'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Download from '@/components/sections/Download'

// 动态导入3D场景，提升首屏加载性能
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-black" />
  ),
})

export default function Home() {
  return (
    <div className="relative">
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Hero Section */}
      <Hero />

      {/* 平滑过渡区域 */}
      <div className="relative h-32 bg-gradient-to-b from-transparent via-black/50 to-black -mt-32 z-0" />

      {/* Features Section */}
      <Features />

      {/* Download Section */}
      <Download />
    </div>
  )
}


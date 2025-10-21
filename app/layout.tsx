import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import BackToTop from '@/components/ui/BackToTop'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'EveryTalk - 开源AI聊天助手',
  description: '高度可定制、功能强大的AI聊天客户端，支持多模型、联网搜索、图像生成，完全开源',
  keywords: ['EveryTalk', 'Every', 'AI聊天', 'Android', '开源', '多模型', 'ChatGPT', 'Gemini', 'Claude'],
  authors: [{ name: 'EveryTalk Team' }],
  icons: {
    icon: 'https://qone.kuz7.com/uploads/images/2025/10/21/1f701dda-11f4-44c4-89f3-541211fe7969.png',
    apple: 'https://qone.kuz7.com/uploads/images/2025/10/21/1f701dda-11f4-44c4-89f3-541211fe7969.png',
  },
  openGraph: {
    title: 'EveryTalk - 开源AI聊天助手',
    description: '高度可定制、功能强大的AI聊天客户端，支持多模型、联网搜索、图像生成',
    type: 'website',
    url: 'https://github.com/roseforljh/EveryTalk',
    images: [
      {
        url: 'https://qone.kuz7.com/uploads/images/2025/10/21/1f701dda-11f4-44c4-89f3-541211fe7969.png',
        width: 1200,
        height: 630,
        alt: 'EveryTalk AI助手',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EveryTalk - 开源AI聊天助手',
    description: '高度可定制、功能强大的AI聊天客户端',
    images: ['https://qone.kuz7.com/uploads/images/2025/10/21/1f701dda-11f4-44c4-89f3-541211fe7969.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter">
        <ScrollProgress />
        <CustomCursor />
        <BackToTop />
        <Header />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}


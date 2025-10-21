'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Navigation from './Navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: '首页', href: '/' },
    { name: '功能', href: '/features' },
    { name: '下载', href: '/download' },
  ]

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="container-custom mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2 backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/10"
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 5,
                  boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)'
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <img 
                  src="https://qone.kuz7.com/uploads/images/2025/10/21/1f701dda-11f4-44c4-89f3-541211fe7969.png"
                  alt="EveryTalk Logo"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </motion.div>
              <span className="font-poppins font-bold text-xl gradient-text group-hover:scale-105 transition-transform duration-200">
                EveryTalk
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-300 hover:text-primary transition-colors duration-200 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              
              <Link href="/download">
                <Button size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  立即下载
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg glass"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <Navigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  )
}


'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Heart } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/roseforljh/EveryTalk', label: 'GitHub' },
  ]

  const footerLinks = [
    {
      title: '产品',
      links: [
        { name: '功能介绍', href: '/features' },
        { name: '下载应用', href: '/download' },
      ],
    },
    {
      title: '资源',
      links: [
        { name: '文档', href: '#' },
        { name: '帮助中心', href: '#' },
      ],
    },
    {
      title: '公司',
      links: [
        { name: '关于我们', href: '#' },
        { name: '联系我们', href: '#' },
      ],
    },
  ]

  return (
    <footer className="relative border-t border-dark-border bg-black">
      <div className="container-custom mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 p-2 backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://qone.kuz7.com/uploads/images/2025/10/21/1f701dda-11f4-44c4-89f3-541211fe7969.png"
                  alt="EveryTalk Logo"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <span className="font-poppins font-bold text-xl gradient-text">
                EveryTalk
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              高度可定制的开源AI聊天助手，支持多模型接入、联网搜索、图像生成。
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
              {footerLinks.map((section, index) => (
            <div key={section.title}>
              <h3 className="font-semibold text-accent mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EveryTalk. All rights reserved. Open Source under MIT License.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" /> by EveryTalk Team
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient - 太极渐变 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary via-accent via-secondary to-transparent opacity-60" />
    </footer>
  )
}


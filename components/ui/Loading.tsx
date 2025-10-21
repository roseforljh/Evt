'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
      <div className="relative">
        {/* 3D Cube Loader */}
        <motion.div
          className="w-20 h-20 relative loader-3d"
          animate={{
            rotateX: 360,
            rotateY: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Front face */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-80 rounded-lg" />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-primary rounded-lg blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 text-sm">加载中...</p>
        </motion.div>
      </div>
    </div>
  )
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}


import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #8B5CF6, #00E5FF, #22C55E)',
        boxShadow: '0 0 10px rgba(139,92,246,0.5)',
      }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}

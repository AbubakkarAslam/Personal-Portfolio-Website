import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2800
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setProgress(newProgress)

      if (elapsed < duration) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(() => onComplete(), 600)
      }
    }

    requestAnimationFrame(animate)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
        <div className="relative mb-8">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={339.292}
              strokeDashoffset={339.292 - (progress / 100) * 339.292}
              style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.6))' }}
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold gradient-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            MBA
          </motion.div>
        </div>

        <motion.p
          className="font-display text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {progress}%
        </motion.p>

        <motion.p
          className="text-muted text-sm tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Experience
        </motion.p>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
        </div>
    </motion.div>
  )
}

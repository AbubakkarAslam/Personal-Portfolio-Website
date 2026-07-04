import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function SkillCircle({ name, level, delay = 0 }) {
  const gradId = `skillGrad-${name.replace(/\s+/g, '-')}`
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (level / 100) * circumference

  return (
    <motion.div
      className="flex flex-col items-center gap-3 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="4"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeOut' }}
            className="group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
          />
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
          {level}%
        </span>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
      </div>
      <span className="text-sm text-muted group-hover:text-white transition-colors text-center">
        {name}
      </span>
    </motion.div>
  )
}

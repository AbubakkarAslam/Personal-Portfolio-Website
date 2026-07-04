import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaKaggle } from 'react-icons/fa'
import { personalInfo } from '../../data/personal'

const socials = [
  { icon: FaGithub, href: personalInfo.github, label: 'GitHub', color: '#FFFFFF' },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0A66C2' },
  // { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email', color: '#8B5CF6' },
  { icon: FaKaggle, href: personalInfo.kaggle, label: 'Kaggle', color: '#20BEFF' },
]

export default function SocialLinks({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-12 h-12 text-xl',
    lg: 'w-14 h-14 text-2xl',
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map(({ icon: Icon, href, label, color }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${sizeClasses[size]} glass-card rounded-full flex items-center justify-center text-muted hover:text-white transition-colors relative group`}
          data-magnetic
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          whileHover={{
            scale: 1.15,
            rotate: 5,
            boxShadow: `0 0 25px ${color}40`,
          }}
        >
          <Icon />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-glass px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
            {label}
          </span>
        </motion.a>
      ))}
    </div>
  )
}

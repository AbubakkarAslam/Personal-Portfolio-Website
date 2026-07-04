import { motion } from 'framer-motion'

export default function SectionTitle({ subtitle, title, align = 'center' }) {
  const alignClass =
    align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <motion.div
      className={`flex flex-col gap-3 mb-16 ${alignClass}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-secondary text-sm font-medium tracking-widest uppercase">
        {subtitle}
      </span>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        {title}
      </h2>
      <div className="w-20 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
    </motion.div>
  )
}

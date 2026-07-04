import { motion } from 'framer-motion'

const directions = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
}

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  id,
  as: Component = 'section',
}) {
  return (
    <Component id={id} className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={directions[direction]}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </Component>
  )
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={directions[direction]}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

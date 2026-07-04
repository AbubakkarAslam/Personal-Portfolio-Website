import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const variants = {
  primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  outline:
    'bg-transparent border border-border text-white hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]',
  ghost: 'bg-glass text-white border border-border',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  type = 'button',
  download,
  target,
  rel,
  'data-magnetic': dataMagnetic = true,
  ...props
}) {
  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden group cursor-pointer'

  const content = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_40px_rgba(0,229,255,0.4)]" />
    </>
  )

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link
        to={to}
        spy
        smooth
        offset={-80}
        duration={800}
        className={classes}
        data-magnetic={dataMagnetic}
        {...props}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        data-magnetic={dataMagnetic}
        download={download}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      data-magnetic={dataMagnetic}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {content}
    </motion.button>
  )
}

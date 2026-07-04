import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FaArrowUp } from 'react-icons/fa'
import { navLinks } from '../../data/navigation'
import { personalInfo } from '../../data/personal'
import SocialLinks from '../ui/SocialLinks'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border mt-20" role="contentinfo">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link
              to="home"
              spy
              smooth
              offset={-80}
              duration={800}
              className="font-display text-3xl font-bold gradient-text cursor-pointer inline-block mb-4"
            >
              {personalInfo.initials}
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              {personalInfo.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2" role="list">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    to={id}
                    spy
                    smooth
                    offset={-80}
                    duration={800}
                    className="text-muted text-sm hover:text-secondary transition-colors cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Connect</h3>
            <SocialLinks size="sm" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-muted text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-muted text-xs">
            Built with React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] z-50"
        data-magnetic
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(0,229,255,0.5)' }}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  )
}

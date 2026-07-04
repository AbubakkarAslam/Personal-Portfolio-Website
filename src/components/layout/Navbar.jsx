import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { navLinks } from '../../data/navigation'
import { personalInfo } from '../../data/personal'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import Button from '../ui/Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  console.log(navLinks); // <-- Add it here
  const [scrolled, setScrolled] = useState(false)
  const { direction, scrollY } = useScrollDirection()
  const activeSection = useActiveSection(navLinks.map((l) => l.id))
  const isMobile = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    setScrolled(scrollY > 50)
  }, [scrollY])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const hidden = direction === 'down' && scrollY > 200

  return (
    <>
      <motion.header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9000] w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 ${
          scrolled
            ? 'glass-card backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        } rounded-2xl border border-border`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        role="banner"
      >
        <nav
          className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4"
          aria-label="Main navigation"
        >
          <Link
            to="home"
            spy
            smooth
            offset={-80}
            duration={800}
            className="font-display font-bold text-lg md:text-xl text-white hover:text-primary transition-colors cursor-pointer shrink-0"
            data-magnetic
          >
            <span className="hidden lg:inline">{personalInfo.name}</span>
            <span className="lg:hidden gradient-text text-2xl">{personalInfo.initials}</span>
          </Link>

          {!isMobile && (
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2" role="list">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    to={id}
                    spy
                    smooth
                    offset={-80}
                    duration={800}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors cursor-pointer group ${
                      activeSection === id ? 'text-white' : 'text-muted hover:text-white'
                    }`}
                    data-magnetic
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full ${
                        activeSection === id ? 'w-full shadow-[0_0_8px_rgba(139,92,246,0.6)]' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-3">
            <Button to="contact" className="hidden sm:inline-flex text-sm px-5 py-2.5">
              Hire Me →
            </Button>

            {isMobile && (
              <button
                type="button"
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl glass-card text-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
              </button>
            )}
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 z-[8999] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 border border-border"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={id}
                      spy
                      smooth
                      offset={-80}
                      duration={800}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                        activeSection === id
                          ? 'text-white bg-primary/10'
                          : 'text-muted hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <Button to="contact" className="w-full" onClick={() => setIsOpen(false)}>
                  Hire Me →
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

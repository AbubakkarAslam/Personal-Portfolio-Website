import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaDownload } from 'react-icons/fa'
import { personalInfo } from '../../data/personal'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { FadeIn } from '../ui/AnimatedSection'
import profileImage from './profile.png';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center section-padding pt-32"
      aria-label="Hero section"
    >
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="order-2 lg:order-1">
          <FadeIn direction="left">
            <motion.p
              className="text-secondary font-medium tracking-wide mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I&apos;m
            </motion.p>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              {personalInfo.name}
            </h1>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="h-12 md:h-14 mb-6">
              <TypeAnimation
                sequence={personalInfo.roles.flatMap((role) => [role, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-display text-2xl md:text-3xl font-semibold gradient-text"
              />
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.3}>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mb-8">
              {personalInfo.intro}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                href={personalInfo.resumeUrl}
                download
                className="shadow-[0_0_25px_rgba(139,92,246,0.3)]"
              >
                <FaDownload className="text-sm" />
                Download Resume
              </Button>
              <Button variant="outline" to="portfolio">
                View My Work
              </Button>
            </div>
          </FadeIn>

          <SocialLinks />
        </div>

        <FadeIn direction="right" delay={0.3} className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/30 rounded-full blur-[60px] scale-110" />

            {/* Outer dashed ring - anticlockwise */}
            <motion.div
              className="absolute inset-[-20px] rounded-full border-2 border-dashed border-primary/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner dots ring - clockwise */}
            <motion.div
              className="absolute inset-[-10px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#00E5FF]"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 30}deg) translateY(-${160}px) translateX(-50%)`,
                  }}
                />
              ))}
            </motion.div>

            {/* Floating particles around image */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random(),
                }}
              />
            ))}

            {/* Profile image */}
            <motion.div
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-border group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={profileImage}
                alt={`${personalInfo.name} - AI & Machine Learning Engineer`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="eager"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

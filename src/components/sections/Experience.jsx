import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { FadeIn } from '../ui/AnimatedSection'
import { experience } from '../../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="relative section-padding" aria-labelledby="experience-heading">
      <div className="container-custom">
        <SectionTitle subtitle="My Journey" title="Experience Timeline" />

        <div className="relative max-w-2xl mx-auto">
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent md:-translate-x-1/2"
            aria-hidden="true"
          />

          {experience.map((item, i) => (
            <FadeIn key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.15}>
              <div
                className={`relative flex items-start gap-6 mb-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                <motion.div
                  className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary md:-translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.6)] z-10"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />

                <article className="ml-14 md:ml-0 md:w-1/2 glass-card rounded-2xl p-6 gradient-border hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-shadow">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    {item.year}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                </article>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

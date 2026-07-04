import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { FadeIn } from '../ui/AnimatedSection'
import { services } from '../../data/services'

export default function Services() {
  return (
    <section id="services" className="relative section-padding" aria-labelledby="services-heading">
      <div className="container-custom">
        <SectionTitle subtitle="What I Do" title="Services I Offer" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} direction="up" delay={i * 0.08}>
              <motion.article
                className="glass-card rounded-2xl p-6 h-full gradient-border group cursor-pointer"
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(139,92,246,0.15)' }}
                transition={{ duration: 0.3 }}
                data-magnetic
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-2xl text-secondary group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-3 group-hover:gradient-text transition-all">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{service.description}</p>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

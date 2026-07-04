import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { FadeIn } from '../ui/AnimatedSection'
import { projects, categories } from '../../data/projects'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="relative section-padding" aria-labelledby="projects-heading">
      <div className="container-custom">
        <SectionTitle subtitle="My Work" title="Featured Projects" />

        <FadeIn direction="up">
          <div
            className="flex flex-wrap justify-center gap-3 mb-12"
            role="tablist"
            aria-label="Project categories"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                    : 'glass-card text-muted hover:text-white border border-border'
                }`}
                data-magnetic
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl overflow-hidden gradient-border group"
                data-magnetic
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width={400}
                    height={225}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary/80 text-xs font-medium text-white">
                    {project.metric}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-muted space-y-1 mb-4">
                    <p>
                      <span className="text-white/70">Dataset:</span> {project.dataset}
                    </p>
                    <p>
                      <span className="text-white/70">Algorithms:</span>{' '}
                      {Array.isArray(project.algorithms)
                        ? project.algorithms.join(', ')
                        : project.algorithms}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg glass-card text-sm text-muted hover:text-white transition-colors border border-border hover:border-primary/30"
                      data-magnetic
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

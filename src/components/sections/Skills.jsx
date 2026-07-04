import SectionTitle from '../ui/SectionTitle'
import SkillCircle from '../ui/SkillCircle'
import { FadeIn } from '../ui/AnimatedSection'
import { skillCategories } from '../../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="relative section-padding grid place-items-center" aria-labelledby="skills-heading">
      <div className="container-custom">
        <SectionTitle subtitle="My Skills" title="Technical Expertise" />

        <div className="space-y-16 ">
          {skillCategories.map((category, catIndex) => (
            <FadeIn key={category.title} direction="up" delay={catIndex * 0.1}>
              <div>
                <h3
                  id={catIndex === 0 ? 'skills-heading' : undefined}
                  className="font-display text-xl md:text-2xl font-semibold text-white mb-8 text-center"
                >
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 ">
                  {category.skills.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="glass-card rounded-2xl p-4 gradient-border hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-shadow duration-300"
                    >
                      <SkillCircle
                        name={skill.name}
                        level={skill.level}
                        delay={i * 0.05}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

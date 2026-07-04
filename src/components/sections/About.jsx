import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import Counter from '../ui/Counter'
import { FadeIn } from '../ui/AnimatedSection'
import { personalInfo } from '../../data/personal'
import { FaDownload } from 'react-icons/fa'
import profileImage from './profile.png';

export default function About() {
  return (
    <section id="about" className="relative section-padding" aria-labelledby="about-heading">
      <div className="container-custom">
        <SectionTitle subtitle="About Me" title="Crafting Intelligent Solutions" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-3xl blur-2xl" />
              <div className="relative glass-card rounded-3xl overflow-hidden gradient-border">
                <img
                  src={profileImage}
                  alt={`${personalInfo.name} profile`}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div>
              <h3 id="about-heading" className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                Turning Data Into <span className="gradient-text">Intelligence</span>
              </h3>
              {personalInfo.aboutText.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-muted leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}

              <Button href={personalInfo.resumeUrl} download>
                <FaDownload />
                Download Resume
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

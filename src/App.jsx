import { lazy, Suspense} from 'react'
// import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import { useMagneticEffect } from './hooks/useMagneticEffect'
// import LoadingScreen from './components/layout/LoadingScreen'
import AnimatedBackground from './components/layout/AnimatedBackground'
// import CustomCursor from './components/layout/CustomCursor'
// import ScrollProgress from './components/layout/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'

const About = lazy(() => import('./components/sections/About'))
const Services = lazy(() => import('./components/sections/Services'))
const Skills = lazy(() => import('./components/sections/Skills'))
// const Projects = lazy(() => import('./components/sections/Projects'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Contact = lazy(() => import('./components/sections/Contact'))

function SectionFallback() {
  return <div className="section-padding" aria-hidden="true" />
}

export default function App() {
  useLenis(true)
  useMagneticEffect()

  return (
    <>


  <>
    <a
      href="#home"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>

    <AnimatedBackground />
    <Navbar />

    <main className="relative z-10">
      <Hero />

      <Suspense fallback={<SectionFallback />}>
        <About />
        <Services />
        <Skills />
        {/* <Projects /> */}
        <Experience />
        <Contact />
      </Suspense>
    </main>

    <Footer />
</>
    </>
  )
}

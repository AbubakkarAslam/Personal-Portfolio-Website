import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )

      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach((obs, i) => {
        const el = document.getElementById(sectionIds[i])
        if (obs && el) obs.unobserve(el)
      })
    }
  }, [sectionIds])

  return activeSection
}

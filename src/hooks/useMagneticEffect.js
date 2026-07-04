import { useEffect } from 'react'
import { useMediaQuery } from './useMediaQuery'

export function useMagneticEffect() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e) => {
      const el = e.target.closest('[data-magnetic]')
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25
      el.style.transform = `translate(${x}px, ${y}px)`
      el.style.transition = 'transform 0.15s ease-out'
    }

    const handleMouseLeave = (e) => {
      const el = e.target.closest('[data-magnetic]')
      if (!el) return
      el.style.transform = ''
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseout', handleMouseLeave, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [isMobile])
}

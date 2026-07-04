import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    document.documentElement.classList.add('lenis')

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('lenis')
      lenis.destroy()
    }
  }, [enabled])
}

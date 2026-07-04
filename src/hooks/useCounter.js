import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export function useCounter(end, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }

    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return { count, ref, display: `${count}${suffix}` }
}

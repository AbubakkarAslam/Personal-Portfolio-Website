import { useState, useEffect } from 'react'

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState('up')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      setScrollY(currentY)

      if (Math.abs(currentY - lastY) < threshold) return

      setDirection(currentY > lastY ? 'down' : 'up')
      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { direction, scrollY }
}

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function CustomCursor() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0 })
  const ringRef = useRef({ x: 0, y: 0 })

  const dotX = useSpring(0, { stiffness: 500, damping: 28 })
  const dotY = useSpring(0, { stiffness: 500, damping: 28 })
  const ringX = useSpring(0, { stiffness: 150, damping: 20 })
  const ringY = useSpring(0, { stiffness: 150, damping: 20 })

  useEffect(() => {
    if (isMobile) return

    let active = true

    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const animateRing = () => {
      if (!active) return
      ringRef.current.x += (cursorRef.current.x - ringRef.current.x) * 0.15
      ringRef.current.y += (cursorRef.current.y - ringRef.current.y) * 0.15
      ringX.set(ringRef.current.x)
      ringY.set(ringRef.current.y)
      requestAnimationFrame(animateRing)
    }

    const handleHoverStart = (e) => {
      const target = e.target.closest('a, button, [data-magnetic], input, textarea, select')
      setIsHovering(!!target)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleHoverStart, { passive: true })
    requestAnimationFrame(animateRing)

    return () => {
      active = false
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleHoverStart)
    }
  }, [isMobile, dotX, dotY, ringX, ringY])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-secondary pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px #00E5FF, 0 0 20px #8B5CF6',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/50 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          boxShadow: isHovering
            ? '0 0 20px rgba(139,92,246,0.4), inset 0 0 10px rgba(0,229,255,0.2)'
            : '0 0 10px rgba(139,92,246,0.2)',
          transition: 'width 0.3s, height 0.3s, box-shadow 0.3s',
        }}
      />
    </>
  )
}

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block"
      style={{
        x: sx,
        y: sy,
        width: 400,
        height: 400,
        background:
          'radial-gradient(circle at center, rgba(182, 0, 168, 0.18) 0%, rgba(118, 33, 176, 0.10) 35%, transparent 70%)',
        filter: 'blur(40px)',
        mixBlendMode: 'screen',
      }}
    />
  )
}

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'

type MagnetProps = {
  children: ReactNode
  /** Distance from element edge at which the magnet starts engaging. */
  padding?: number
  /** Higher = subtler pull (offset = dist / strength). */
  strength?: number
  className?: string
}

/** Spring-physics magnetic hover. The element starts at its natural centred
 *  position and smoothly springs toward the cursor when nearby, smoothly
 *  springs back to centre otherwise — no CSS transition snap, no jitter. */
export function Magnet({
  children,
  padding = 180,
  strength = 4,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { stiffness: 110, damping: 18, mass: 0.6 })
  const y = useSpring(mvY, { stiffness: 110, damping: 18, mass: 0.6 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const within =
        Math.abs(dx) < r.width / 2 + padding &&
        Math.abs(dy) < r.height / 2 + padding
      if (within) {
        mvX.set(dx / strength)
        mvY.set(dy / strength)
      } else {
        mvX.set(0)
        mvY.set(0)
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [padding, strength, mvX, mvY])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}

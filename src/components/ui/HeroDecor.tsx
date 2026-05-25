import { motion } from 'framer-motion'
import {
  BarChart3,
  Brain,
  Code2,
  Database,
  LineChart,
  PieChart,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

type IconDecor = {
  type: 'icon'
  Icon: LucideIcon
  /** Position as percentages of the hero section box. */
  top?: string
  bottom?: string
  left?: string
  right?: string
  size: number
  color: string
  /** Different drift signature so multiple icons don't move in lockstep. */
  drift: 'a' | 'b' | 'c' | 'd'
  /** Slow rotation cycle (s); omit for none. */
  spinSec?: number
  /** Stagger the animation start so icons don't sync. */
  delay?: number
  /** Show only md+ — skip on phones where space is tight. */
  desktopOnly?: boolean
}

type ChipDecor = {
  type: 'chip'
  label: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  color: string
  drift: 'a' | 'b' | 'c' | 'd'
  delay?: number
  desktopOnly?: boolean
}

type Decor = IconDecor | ChipDecor

const decors: Decor[] = [
  // ── Icons spread across the hero area ─────────────────────────────────
  { type: 'icon', Icon: LineChart,   top: '18%',  left: '6%',   size: 30, color: '#b600a8', drift: 'a', delay: 0.0, spinSec: 0 },
  { type: 'icon', Icon: BarChart3,   top: '60%',  left: '5%',   size: 26, color: '#7621b0', drift: 'b', delay: 0.4 },
  { type: 'icon', Icon: Database,    bottom: '14%', left: '14%', size: 22, color: '#be4c00', drift: 'c', delay: 0.7, desktopOnly: true },
  { type: 'icon', Icon: Brain,       top: '22%',  right: '8%',  size: 32, color: '#b600a8', drift: 'd', delay: 0.2, spinSec: 0 },
  { type: 'icon', Icon: Code2,       top: '55%',  right: '6%',  size: 26, color: '#7621b0', drift: 'a', delay: 1.0 },
  { type: 'icon', Icon: PieChart,    bottom: '20%', right: '15%', size: 24, color: '#be4c00', drift: 'b', delay: 0.5, desktopOnly: true },
  { type: 'icon', Icon: Sparkles,    top: '40%',  left: '20%',  size: 18, color: '#bbccd7', drift: 'c', delay: 1.4, desktopOnly: true },
  { type: 'icon', Icon: TrendingUp,  top: '38%',  right: '22%', size: 20, color: '#bbccd7', drift: 'd', delay: 1.6, desktopOnly: true },

  // ── Impact chips — small floating pills with real numbers ─────────────
  { type: 'chip', label: '$1.5M / yr',    top: '30%',  left: '4%',   color: '#be4c00', drift: 'b', delay: 0.9, desktopOnly: true },
  { type: 'chip', label: '+10% CM1',      top: '48%',  right: '4%',  color: '#7621b0', drift: 'a', delay: 1.1, desktopOnly: true },
  { type: 'chip', label: 'A/B Testing',   bottom: '28%', left: '6%', color: '#b600a8', drift: 'd', delay: 1.3, desktopOnly: true },
  { type: 'chip', label: 'RCA · Cohorts', bottom: '32%', right: '8%', color: '#bbccd7', drift: 'c', delay: 1.5, desktopOnly: true },
]

/** Animation signatures: distinct multi-keyframe drifts so the field of icons
 *  feels alive instead of bobbing in unison. */
const DRIFTS = {
  a: {
    x: [0, 14, -6, 8, 0],
    y: [0, -10, 6, -8, 0],
    duration: 11,
  },
  b: {
    x: [0, -12, 6, -8, 0],
    y: [0, 8, -10, 4, 0],
    duration: 13,
  },
  c: {
    x: [0, 8, -10, 12, 0],
    y: [0, -6, 10, -4, 0],
    duration: 9.5,
  },
  d: {
    x: [0, -8, 12, -10, 0],
    y: [0, -12, 6, -8, 0],
    duration: 12.5,
  },
}

export function HeroDecor() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {decors.map((d, i) => {
        const drift = DRIFTS[d.drift]
        const positionStyle: React.CSSProperties = {
          top: d.top,
          bottom: d.bottom,
          left: d.left,
          right: d.right,
        }
        const hideClass = d.desktopOnly ? 'hidden md:flex' : 'flex'

        if (d.type === 'icon') {
          const Icon = d.Icon
          return (
            <motion.div
              key={i}
              className={`absolute ${hideClass} items-center justify-center`}
              style={positionStyle}
              animate={{
                x: drift.x,
                y: drift.y,
                ...(d.spinSec ? { rotate: [0, 360] } : {}),
              }}
              transition={{
                x: { duration: drift.duration, ease: 'easeInOut', repeat: Infinity, delay: d.delay ?? 0 },
                y: { duration: drift.duration, ease: 'easeInOut', repeat: Infinity, delay: d.delay ?? 0 },
                ...(d.spinSec
                  ? { rotate: { duration: d.spinSec, ease: 'linear', repeat: Infinity } }
                  : {}),
              }}
            >
              <Icon
                size={d.size}
                strokeWidth={1.5}
                style={{ color: d.color, filter: `drop-shadow(0 0 14px ${d.color}55)` }}
              />
            </motion.div>
          )
        }

        return (
          <motion.div
            key={i}
            className={`absolute ${hideClass} items-center justify-center rounded-full px-3 py-1.5 backdrop-blur-sm border`}
            style={{
              ...positionStyle,
              background: 'rgba(215, 226, 234, 0.04)',
              borderColor: `${d.color}55`,
              boxShadow: `0 0 18px ${d.color}22`,
            }}
            animate={{ x: drift.x, y: drift.y }}
            transition={{
              x: { duration: drift.duration, ease: 'easeInOut', repeat: Infinity, delay: d.delay ?? 0 },
              y: { duration: drift.duration, ease: 'easeInOut', repeat: Infinity, delay: d.delay ?? 0 },
            }}
          >
            <span
              className="font-medium uppercase tracking-widest whitespace-nowrap text-[0.55rem] md:text-[0.6rem]"
              style={{ color: d.color }}
            >
              {d.label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

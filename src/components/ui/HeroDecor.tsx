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
  top?: string
  bottom?: string
  left?: string
  right?: string
  size: number
  color: string
  drift: 'a' | 'b' | 'c' | 'd'
  spinSec?: number
  delay?: number
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
  // ── 8 floating Lucide icons spread across the hero ────────────────────
  { type: 'icon', Icon: LineChart,   top: '18%',  left: '6%',   size: 30, color: '#b600a8', drift: 'a', delay: 0.0 },
  { type: 'icon', Icon: BarChart3,   top: '60%',  left: '4%',   size: 26, color: '#7621b0', drift: 'b', delay: 0.4 },
  { type: 'icon', Icon: Database,    bottom: '14%', left: '12%', size: 22, color: '#be4c00', drift: 'c', delay: 0.7, desktopOnly: true },
  { type: 'icon', Icon: Brain,       top: '22%',  right: '7%',  size: 32, color: '#b600a8', drift: 'd', delay: 0.2 },
  { type: 'icon', Icon: Code2,       top: '55%',  right: '5%',  size: 26, color: '#7621b0', drift: 'a', delay: 1.0 },
  { type: 'icon', Icon: PieChart,    bottom: '20%', right: '13%', size: 24, color: '#be4c00', drift: 'b', delay: 0.5, desktopOnly: true },
  { type: 'icon', Icon: Sparkles,    top: '40%',  left: '18%',  size: 18, color: '#bbccd7', drift: 'c', delay: 1.4, desktopOnly: true },
  { type: 'icon', Icon: TrendingUp,  top: '38%',  right: '20%', size: 20, color: '#bbccd7', drift: 'd', delay: 1.6, desktopOnly: true },

  // ── Skill chips ───────────────────────────────────────────────────────
  { type: 'chip', label: 'AI / LLM',           top: '28%',  left: '3%',   color: '#b600a8', drift: 'b', delay: 0.5 },
  { type: 'chip', label: 'Python',             top: '46%',  left: '11%',  color: '#7621b0', drift: 'd', delay: 0.8, desktopOnly: true },
  { type: 'chip', label: 'SQL',                bottom: '32%', left: '4%', color: '#be4c00', drift: 'a', delay: 1.1 },
  { type: 'chip', label: 'pandas',             top: '32%',  right: '14%', color: '#7621b0', drift: 'c', delay: 0.6, desktopOnly: true },
  { type: 'chip', label: 'A/B Testing',        top: '50%',  right: '3%',  color: '#b600a8', drift: 'a', delay: 1.0 },
  { type: 'chip', label: 'Product Analytics',  bottom: '36%', right: '6%', color: '#bbccd7', drift: 'b', delay: 1.3 },
  { type: 'chip', label: 'RCA · Cohorts',      bottom: '22%', right: '22%', color: '#bbccd7', drift: 'c', delay: 1.5, desktopOnly: true },
  { type: 'chip', label: 'Forecasting',        bottom: '24%', left: '24%', color: '#b600a8', drift: 'd', delay: 1.7, desktopOnly: true },
  { type: 'chip', label: 'Experimentation',    top: '14%',  right: '25%', color: '#7621b0', drift: 'b', delay: 1.2, desktopOnly: true },
  { type: 'chip', label: 'Vibe Coding',        top: '14%',  left: '24%',  color: '#be4c00', drift: 'a', delay: 1.4, desktopOnly: true },
]

/** Distinct multi-keyframe drift paths so the field never moves in lockstep. */
const DRIFTS = {
  a: { x: [0, 14, -6, 8, 0], y: [0, -10, 6, -8, 0], duration: 11 },
  b: { x: [0, -12, 6, -8, 0], y: [0, 8, -10, 4, 0], duration: 13 },
  c: { x: [0, 8, -10, 12, 0], y: [0, -6, 10, -4, 0], duration: 9.5 },
  d: { x: [0, -8, 12, -10, 0], y: [0, -12, 6, -8, 0], duration: 12.5 },
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

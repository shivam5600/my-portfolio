import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { timeline, type Milestone } from '../../data/timeline'
import { FadeIn } from '../ui/FadeIn'

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  })

  return (
    <section
      id="journey"
      ref={ref}
      className="relative px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 overflow-hidden"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Journey
        </h2>
      </FadeIn>

      {/* Desktop horizontal — 6 nodes */}
      <div className="hidden md:block relative max-w-7xl mx-auto">
        <div className="absolute top-9 left-0 right-0 h-px bg-haze/15" />
        <motion.div
          className="absolute top-9 left-0 h-px bg-gradient-to-r from-[#b600a8] via-[#7621b0] to-[#be4c00] origin-left"
          style={{ scaleX: scrollYProgress, right: 0 }}
        />
        <div className="grid grid-cols-6 gap-3 lg:gap-5 relative">
          {timeline.map((m, i) => (
            <Node
              key={`${m.year}-${m.role}`}
              milestone={m}
              index={i}
              progress={scrollYProgress}
              total={timeline.length}
            />
          ))}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="md:hidden relative max-w-md mx-auto">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-haze/15" />
        <motion.div
          className="absolute left-4 top-0 w-px bg-gradient-to-b from-[#b600a8] via-[#7621b0] to-[#be4c00] origin-top"
          style={{ scaleY: scrollYProgress, bottom: 0 }}
        />
        <div className="flex flex-col gap-9 pl-12">
          {timeline.map((m, i) => (
            <NodeMobile
              key={`${m.year}-${m.role}`}
              milestone={m}
              index={i}
              progress={scrollYProgress}
              total={timeline.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type NodeProps = {
  milestone: Milestone
  index: number
  progress: MotionValue<number>
  total: number
}

function NodeDot({
  scale,
  opacity,
  size = 'lg',
  logo,
  org,
  initials,
}: {
  scale: MotionValue<number>
  opacity: MotionValue<number>
  size?: 'sm' | 'lg'
  logo?: string
  org: string
  initials?: string
}) {
  const dim = size === 'lg' ? 'w-16 h-16' : 'w-9 h-9'
  const inner = size === 'lg' ? 'w-12 h-12' : 'w-6 h-6'
  const label = (initials ?? org.slice(0, 4)).toUpperCase()
  return (
    <motion.div
      className={`${dim} rounded-full border-2 border-haze bg-ink flex items-center justify-center relative shrink-0`}
      style={{ scale, opacity }}
    >
      <div
        className={`${inner} rounded-full bg-haze/5 flex items-center justify-center overflow-hidden`}
      >
        {logo ? (
          <img
            src={logo}
            alt={`${org} logo`}
            className="w-full h-full object-contain p-1"
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              img.style.display = 'none'
              const sibling = img.nextElementSibling as HTMLElement | null
              if (sibling) sibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="w-full h-full hidden items-center justify-center text-haze/80 font-medium uppercase tracking-tight text-center"
          style={{
            display: logo ? 'none' : 'flex',
            fontSize: size === 'lg' ? '0.62rem' : '0.5rem',
            lineHeight: 1,
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  )
}

function Node({ milestone, index, progress, total }: NodeProps) {
  const threshold = (index + 0.5) / total
  const dotScale = useTransform(progress, [threshold - 0.12, threshold], [0.7, 1])
  const dotOpacity = useTransform(progress, [threshold - 0.12, threshold], [0.4, 1])
  return (
    <FadeIn delay={index * 0.08} y={20} className="flex flex-col items-center text-center">
      <NodeDot
        scale={dotScale}
        opacity={dotOpacity}
        size="lg"
        logo={milestone.logo}
        org={milestone.org}
        initials={milestone.initials}
      />
      <div className="mt-4 hero-heading font-black text-lg lg:text-xl tracking-tight whitespace-nowrap">
        {milestone.year}
      </div>
      <div className="mt-1 text-haze font-medium text-sm lg:text-base whitespace-nowrap">
        {milestone.org}
      </div>
      <div className="mt-1 text-haze/55 font-light text-[0.65rem] lg:text-xs uppercase tracking-widest leading-tight">
        {milestone.role}
      </div>
      <p className="mt-3 text-haze/70 font-light text-[0.72rem] lg:text-sm leading-snug max-w-[180px]">
        {milestone.blurb}
      </p>
    </FadeIn>
  )
}

function NodeMobile({ milestone, index, progress, total }: NodeProps) {
  const threshold = (index + 0.5) / total
  const dotScale = useTransform(progress, [threshold - 0.12, threshold], [0.7, 1])
  const dotOpacity = useTransform(progress, [threshold - 0.12, threshold], [0.4, 1])
  return (
    <FadeIn delay={index * 0.06} y={20} className="relative">
      <div className="absolute -left-12 top-0">
        <NodeDot
          scale={dotScale}
          opacity={dotOpacity}
          size="sm"
          logo={milestone.logo}
          org={milestone.org}
          initials={milestone.initials}
        />
      </div>
      <div className="hero-heading font-black text-xl tracking-tight">{milestone.year}</div>
      <div className="mt-0.5 text-haze font-medium">{milestone.org}</div>
      <div className="text-haze/55 font-light text-xs uppercase tracking-widest">
        {milestone.role}
      </div>
      <p className="mt-2 text-haze/75 font-light text-sm leading-relaxed">{milestone.blurb}</p>
    </FadeIn>
  )
}

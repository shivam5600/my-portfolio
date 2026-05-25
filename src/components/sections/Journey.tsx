import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { timeline } from '../../data/timeline'
import { FadeIn } from '../ui/FadeIn'

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
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

      {/* Desktop horizontal */}
      <div className="hidden md:block relative max-w-6xl mx-auto">
        <div className="absolute top-6 left-0 right-0 h-px bg-haze/15" />
        <motion.div
          className="absolute top-6 left-0 h-px bg-gradient-to-r from-[#b600a8] via-[#7621b0] to-[#be4c00] origin-left"
          style={{ scaleX: scrollYProgress, right: 0 }}
        />
        <div className="grid grid-cols-4 gap-6 relative">
          {timeline.map((m, i) => (
            <Node key={m.year} milestone={m} index={i} progress={scrollYProgress} total={timeline.length} />
          ))}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="md:hidden relative max-w-md mx-auto">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-haze/15" />
        <motion.div
          className="absolute left-3 top-0 w-px bg-gradient-to-b from-[#b600a8] via-[#7621b0] to-[#be4c00] origin-top"
          style={{ scaleY: scrollYProgress, bottom: 0 }}
        />
        <div className="flex flex-col gap-10 pl-10">
          {timeline.map((m, i) => (
            <NodeMobile key={m.year} milestone={m} index={i} progress={scrollYProgress} total={timeline.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

type NodeProps = {
  milestone: (typeof timeline)[number]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  total: number
}

function Node({ milestone, index, progress, total }: NodeProps) {
  const threshold = (index + 0.5) / total
  const dotScale = useTransform(progress, [threshold - 0.1, threshold], [0.7, 1])
  const dotOpacity = useTransform(progress, [threshold - 0.1, threshold], [0.4, 1])
  return (
    <FadeIn delay={index * 0.1} y={20} className="flex flex-col items-center text-center">
      <motion.div
        className="w-12 h-12 rounded-full border-2 border-haze bg-ink flex items-center justify-center relative"
        style={{ scale: dotScale, opacity: dotOpacity }}
      >
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#b600a8] to-[#be4c00]" />
      </motion.div>
      <div className="mt-5 hero-heading font-black text-2xl tracking-tight">{milestone.year}</div>
      <div className="mt-1 text-haze font-medium text-base">{milestone.org}</div>
      <div className="mt-1 text-haze/60 font-light text-sm uppercase tracking-widest">{milestone.role}</div>
      <p className="mt-3 text-haze/75 font-light text-sm leading-relaxed max-w-[240px]">{milestone.blurb}</p>
    </FadeIn>
  )
}

function NodeMobile({ milestone, index, progress, total }: NodeProps) {
  const threshold = (index + 0.5) / total
  const dotScale = useTransform(progress, [threshold - 0.1, threshold], [0.7, 1])
  const dotOpacity = useTransform(progress, [threshold - 0.1, threshold], [0.4, 1])
  return (
    <FadeIn delay={index * 0.1} y={20} className="relative">
      <motion.div
        className="absolute -left-10 top-1 w-7 h-7 rounded-full border-2 border-haze bg-ink flex items-center justify-center"
        style={{ scale: dotScale, opacity: dotOpacity }}
      >
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#b600a8] to-[#be4c00]" />
      </motion.div>
      <div className="hero-heading font-black text-xl tracking-tight">{milestone.year}</div>
      <div className="mt-1 text-haze font-medium">{milestone.org}</div>
      <div className="text-haze/60 font-light text-xs uppercase tracking-widest">{milestone.role}</div>
      <p className="mt-2 text-haze/75 font-light text-sm leading-relaxed">{milestone.blurb}</p>
    </FadeIn>
  )
}

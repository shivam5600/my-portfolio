import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../../data/projects'
import { FadeIn } from '../ui/FadeIn'
import { OutlinePill } from '../ui/OutlinePill'
import { X } from 'lucide-react'

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <Card
            key={p.number}
            project={p}
            index={i}
            total={projects.length}
            onOpen={() => setOpen(p)}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && <CaseStudyModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}

type CardProps = {
  project: Project
  index: number
  total: number
  onOpen: () => void
}

function Card({ project, index, total, onOpen }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })
  const targetScale = 1 - (total - 1 - index) * 0.02
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div
      ref={cardRef}
      className="h-[72vh] sm:h-[78vh] md:h-[85vh] sticky"
      style={{ top: `${56 + index * 14}px` }}
    >
      <motion.div
        style={{ scale }}
        className="rounded-[28px] sm:rounded-[36px] md:rounded-[48px] border-2 border-haze bg-ink p-5 sm:p-7 md:p-9 origin-top h-full flex flex-col"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-5 md:mb-7">
          <div className="flex items-start gap-4 md:gap-6 min-w-0 flex-1">
            <div
              className="hero-heading font-black leading-none shrink-0"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 90px)' }}
            >
              {project.number}
            </div>
            <div className="min-w-0 pt-1 sm:pt-2">
              <div className="text-haze/60 font-light text-[0.65rem] sm:text-xs uppercase tracking-widest">
                {project.category}
              </div>
              <h3
                className="text-haze font-medium uppercase tracking-tight leading-tight mt-1"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.65rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <OutlinePill onClick={onOpen} className="shrink-0 hidden sm:block">
            Case Study →
          </OutlinePill>
        </div>

        {/* Hero image with overlay blurb */}
        <div
          className="rounded-[20px] sm:rounded-[28px] md:rounded-[36px] relative overflow-hidden flex-1 min-h-[200px]"
          style={{
            background: project.image
              ? project.art.tall
              : project.art.tall,
          }}
        >
          {project.image && (
            <img
              src={project.image}
              alt={`${project.name} UI`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          )}
          {/* Title watermark — only if image missing */}
          {!project.image && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
              <div
                className="font-black uppercase tracking-tight text-center select-none"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                  color: 'rgba(255, 255, 255, 0.10)',
                  lineHeight: 0.95,
                }}
              >
                {project.name}
              </div>
            </div>
          )}
          {/* Blurb overlay */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-9 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
            <p
              className="text-haze font-light leading-relaxed max-w-2xl"
              style={{ fontSize: 'clamp(0.78rem, 1.1vw, 1rem)' }}
            >
              {project.shortBlurb}
            </p>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-4 sm:hidden">
          <OutlinePill onClick={onOpen} className="w-full">
            Case Study →
          </OutlinePill>
        </div>
      </motion.div>
    </div>
  )
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-ink border-2 border-haze rounded-[28px] sm:rounded-[36px] md:rounded-[48px] max-w-3xl w-full p-6 sm:p-8 md:p-10 relative my-8 sm:my-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-haze hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={26} />
        </button>
        <div className="hero-heading font-black text-3xl sm:text-4xl mb-2">{project.number}</div>
        <div className="text-haze/60 font-light text-xs uppercase tracking-widest mb-2">
          {project.category}
        </div>
        <h3 className="text-haze font-medium uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl mb-6">
          {project.name}
        </h3>

        {project.image && (
          <div className="rounded-[20px] sm:rounded-[28px] overflow-hidden mb-6 aspect-[16/10] bg-ink">
            <img
              src={project.image}
              alt={`${project.name} UI`}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        )}

        <Block label="Problem" body={project.problem} />
        <Block label="What I did" body={project.whatIDid} />
        <Block label="Impact" body={project.impact} accent />
      </motion.div>
    </motion.div>
  )
}

function Block({
  label,
  body,
  accent = false,
}: {
  label: string
  body: string
  accent?: boolean
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div
        className={`font-medium uppercase tracking-widest text-xs mb-2 ${
          accent ? 'hero-heading' : 'text-haze/55'
        }`}
      >
        {label}
      </div>
      <p
        className="text-haze/90 font-light leading-relaxed"
        style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
      >
        {body}
      </p>
    </div>
  )
}

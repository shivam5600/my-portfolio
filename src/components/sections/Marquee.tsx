import { useEffect, useRef, useState } from 'react'
import { toolsRow1, toolsRow2 } from '../../data/tools'

const triple = <T,>(arr: T[]): T[] => [...arr, ...arr, ...arr]

export function Marquee() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const compute = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const raw = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(raw)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  const row1 = triple(toolsRow1)
  const row2 = triple(toolsRow2)

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      aria-label="Tools and techniques"
    >
      <Row tiles={row1} translate={offset - 200} />
      <div className="h-3" />
      <Row tiles={row2} translate={-(offset - 200)} />
    </section>
  )
}

function Row({ tiles, translate }: { tiles: string[]; translate: number }) {
  return (
    <div
      className="flex gap-3 will-change-transform"
      style={{
        transform: `translate3d(${translate}px, 0, 0)`,
      }}
    >
      {tiles.map((tile, i) => (
        <Tile key={`${tile}-${i}`} label={tile} />
      ))}
    </div>
  )
}

function Tile({ label }: { label: string }) {
  return (
    <div
      className="glass-tile rounded-2xl flex items-center justify-center shrink-0"
      style={{
        width: 'clamp(150px, 22vw, 220px)',
        height: 'clamp(64px, 9vw, 84px)',
      }}
    >
      <span className="text-haze font-medium uppercase tracking-widest text-[0.65rem] sm:text-xs md:text-sm whitespace-nowrap px-3 sm:px-4">
        {label}
      </span>
    </div>
  )
}

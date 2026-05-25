import { toolsRow1, toolsRow2 } from '../../data/tools'

/** Continuous slow horizontal marquee. Each row is the source array tripled so
 *  translating by exactly -33.333% loops seamlessly (the next copy looks
 *  identical to the original). Row 1 drifts left, row 2 drifts right. */
const triple = <T,>(arr: T[]): T[] => [...arr, ...arr, ...arr]

export function Marquee() {
  return (
    <section
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      aria-label="Tools and techniques"
    >
      <div className="marquee-track marquee-left">
        <Row tiles={triple(toolsRow1)} />
      </div>
      <div className="h-3" />
      <div className="marquee-track marquee-right">
        <Row tiles={triple(toolsRow2)} />
      </div>
    </section>
  )
}

function Row({ tiles }: { tiles: string[] }) {
  return (
    <div className="flex gap-3 will-change-transform">
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

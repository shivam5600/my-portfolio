/** Tasteful low-key page-wide background animation.
 *  - Two large gradient orbs slowly drift across the viewport
 *  - One subtle accent orb for extra depth
 *  - A faint dot-grid mask that fades toward edges (the "antigravity" feel)
 *  - All purely CSS — no extra JS work per frame
 *  - Pointer-events disabled so it never blocks interaction
 *  - Hidden when (prefers-reduced-motion: reduce)
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* Drifting gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Dot grid with radial fade toward edges */}
      <div className="grid-mesh" />

      {/* Subtle vignette to keep content area visually weighted */}
      <div className="vignette" />
    </div>
  )
}

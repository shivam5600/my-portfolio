import { FadeIn } from '../ui/FadeIn'
import { Magnet } from '../ui/Magnet'
import { ContactButton } from '../ui/ContactButton'

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen flex flex-col px-6 md:px-10"
      style={{ overflowX: 'clip' }}
    >
      {/* H1 — anchored to the top, centered horizontally */}
      <div className="pt-24 sm:pt-28 md:pt-32 relative z-20 overflow-hidden w-full">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-center text-[11vw] sm:text-[12vw] md:text-[13vw] lg:text-[14vw]">
            Hi, i&apos;m Kumar
          </h1>
        </FadeIn>
      </div>

      {/* Portrait — centered horizontally, vertically between H1 and bottom bar */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 top-[60%] -translate-y-1/2 w-[200px] xs:w-[230px] sm:w-[280px] md:w-[340px] lg:w-[400px] pointer-events-none"
      >
        <Magnet padding={150} strength={3}>
          <img
            src="/portrait-3d.png"
            alt="Kumar Shivam"
            className="w-full h-auto select-none portrait-blend"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      {/* Bottom bar — subline left, contact button right */}
      <div className="mt-auto relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 gap-4">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-haze font-light uppercase tracking-wide leading-snug max-w-[200px] sm:max-w-[260px] md:max-w-[340px]"
            style={{ fontSize: 'clamp(0.72rem, 1.15vw, 1.1rem)' }}
          >
            Building the tools,
            <br />
            shipping the experiments,
            <br />
            owning the impact.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

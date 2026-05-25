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
      <div className="flex-1 flex flex-col justify-end relative">
        {/* Background portrait, behind the heading */}
        <FadeIn
          delay={0.6}
          y={30}
          className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] xs:w-[260px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-[42%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none"
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

        {/* Massive heading */}
        <div className="overflow-hidden w-full relative z-20 mt-6 sm:mt-4 md:-mt-5">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m Kumar
            </h1>
          </FadeIn>
        </div>

        {/* Bottom bar: subline left, contact button right */}
        <div className="relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 gap-4">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-haze font-light uppercase tracking-wide leading-snug max-w-[200px] sm:max-w-[300px] md:max-w-[380px]"
              style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1.2rem)' }}
            >
              A Lead Product Analyst at media.net · an IIT BHU grad turning data into revenue.
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

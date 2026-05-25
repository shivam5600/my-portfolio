import { motion } from 'framer-motion'
import { FadeIn } from '../ui/FadeIn'
import { Magnet } from '../ui/Magnet'
import { ContactButton } from '../ui/ContactButton'
import { HeroDecor } from '../ui/HeroDecor'

const HEADING = "Hi, i'm Kumar"

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen flex flex-col px-6 md:px-10"
      style={{ overflowX: 'clip' }}
    >
      {/* Decorative floating analytics icons + impact chips */}
      <HeroDecor />

      {/* Heading + role subline anchored to top */}
      <div className="pt-24 sm:pt-28 md:pt-32 relative z-20 w-full">
        <div className="overflow-hidden w-full">
          <AnimatedHeading text={HEADING} />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-haze/75 font-medium uppercase tracking-[0.25em] text-center mt-3 sm:mt-4"
          style={{ fontSize: 'clamp(0.7rem, 1.1vw, 1.05rem)' }}
        >
          Lead Product Analyst <span className="text-haze/40 mx-2">·</span>{' '}
          IIT BHU Grad
        </motion.p>
      </div>

      {/* Portrait — true centre of hero with ambient figure-8 drift */}
      <FadeIn
        delay={0.7}
        y={30}
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10 w-[220px] xs:w-[260px] sm:w-[300px] md:w-[360px] lg:w-[420px] pointer-events-none"
      >
        <Magnet padding={300} strength={6}>
          <motion.div
            animate={{
              x: [0, 18, 0, -14, 0],
              y: [0, -10, -16, -6, 0],
            }}
            transition={{
              duration: 12,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            style={{ willChange: 'transform' }}
          >
            <motion.img
              src="/portrait-3d.png"
              alt="Kumar Shivam"
              className="w-full h-auto select-none portrait-blend"
              draggable={false}
              animate={{ y: [0, -6, 0], rotate: [-1.2, 1.2, -1.2] }}
              transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.div>
        </Magnet>
      </FadeIn>

      {/* Bottom bar — short subline left, contact button right */}
      <div className="mt-auto relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 gap-4">
        <FadeIn delay={0.45} y={20}>
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
        <FadeIn delay={0.6} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

/** Per-character reveal: each letter slides up + flips with a small stagger. */
function AnimatedHeading({ text }: { text: string }) {
  const chars = Array.from(text)
  return (
    <h1
      className="font-black uppercase tracking-tight leading-none whitespace-nowrap text-center text-[11vw] sm:text-[12vw] md:text-[13vw] lg:text-[14vw]"
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          className="hero-heading inline-block"
          initial={{ opacity: 0, y: '0.55em', rotateX: -80 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2 + i * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </h1>
  )
}

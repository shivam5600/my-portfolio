import { FadeIn } from '../ui/FadeIn'
import { AnimatedText } from '../ui/AnimatedText'
import { ContactButton } from '../ui/ContactButton'

const DECOR_BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7'

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decor — top left */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[100px] sm:w-[140px] md:w-[200px] pointer-events-none"
      >
        <img
          src={`${DECOR_BASE}/moon_icon.11395d36.png`}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </FadeIn>
      {/* Decor — top right */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[100px] sm:w-[140px] md:w-[200px] pointer-events-none"
      >
        <img
          src={`${DECOR_BASE}/lego_icon-1.703bb594.png`}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </FadeIn>
      {/* Decor — bottom left */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[80px] sm:w-[120px] md:w-[170px] pointer-events-none"
      >
        <img
          src={`${DECOR_BASE}/p59_1.4659672e.png`}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </FadeIn>
      {/* Decor — bottom right */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[100px] sm:w-[140px] md:w-[200px] pointer-events-none"
      >
        <img
          src={`${DECOR_BASE}/Group_134-1.2e04f3ce.png`}
          alt=""
          className="w-full h-auto"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-3xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedText
          text="I'm a Lead Product Analyst with 4+ years of turning ambiguous revenue questions into testable hypotheses across billions of bid-level rows. IIT BHU '23 — currently at media.net (contextual ads at web scale); previously MPL and Apna. I build the tools, ship the experiments, and own the impact end to end. Let's build something that moves a metric."
          className="text-haze font-medium text-center leading-relaxed max-w-[640px] mx-auto"
        />
      </div>

      <FadeIn delay={0} y={20} className="relative z-10 mt-16 sm:mt-20 md:mt-24">
        <ContactButton />
      </FadeIn>
    </section>
  )
}

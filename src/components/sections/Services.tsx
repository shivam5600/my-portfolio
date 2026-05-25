import { FadeIn } from '../ui/FadeIn'
import { services } from '../../data/services'

export function Services() {
  return (
    <section
      id="services"
      className="bg-white text-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-ink text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          What I do
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((s, i) => (
          <FadeIn
            key={s.number}
            delay={i * 0.1}
            y={30}
            className="flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-8 sm:py-10 md:py-12 border-t border-ink/15 last:border-b"
          >
            <div
              className="font-black text-ink shrink-0 leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              {s.number}
            </div>
            <div className="flex-1">
              <h3
                className="font-medium uppercase text-ink tracking-tight leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}
              >
                {s.title}
              </h3>
              <p
                className="font-light text-ink/60 leading-relaxed mt-3 max-w-2xl"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)' }}
              >
                {s.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

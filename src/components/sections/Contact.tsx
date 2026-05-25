import { Mail, Phone, Linkedin, Github, Download, ArrowUpRight } from 'lucide-react'
import { FadeIn } from '../ui/FadeIn'
import { ContactButton } from '../ui/ContactButton'

type Row = {
  label: string
  value: string
  href: string
  icon: typeof Mail
  external?: boolean
}

const rows: Row[] = [
  { label: 'Email', value: 'kumarshivamdsdl@gmail.com', href: 'mailto:kumarshivamdsdl@gmail.com', icon: Mail },
  { label: 'Phone', value: '+91 9471621193', href: 'tel:+919471621193', icon: Phone },
  { label: 'LinkedIn', value: '/in/kumar-shivam-', href: 'https://linkedin.com/in/kumar-shivam-', icon: Linkedin, external: true },
  { label: 'GitHub', value: '/shivam5600', href: 'https://github.com/shivam5600', icon: Github, external: true },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-ink rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 md:pb-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-12 sm:mb-16 md:mb-20 leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let&apos;s talk
        </h2>
      </FadeIn>

      <div className="max-w-3xl mx-auto">
        <div className="divide-y divide-haze/15 border-t border-b border-haze/15">
          {rows.map((row, i) => (
            <FadeIn key={row.label} delay={i * 0.08} y={20}>
              <a
                href={row.href}
                target={row.external ? '_blank' : undefined}
                rel={row.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 sm:gap-8 py-5 sm:py-7 group"
              >
                <row.icon
                  size={22}
                  className="text-haze/40 group-hover:text-haze transition-colors shrink-0"
                />
                <span className="text-haze/40 font-light uppercase tracking-widest text-xs sm:text-sm w-20 sm:w-24 shrink-0">
                  {row.label}
                </span>
                <span
                  className="flex-1 text-haze font-medium tracking-tight group-hover:hero-heading transition-all truncate"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
                >
                  {row.value}
                </span>
                <ArrowUpRight
                  size={22}
                  className="text-haze/40 group-hover:text-haze group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} y={20} className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="/Kumar_Shivam_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border-2 border-haze text-haze px-8 py-3 sm:px-10 sm:py-3.5 font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-haze/10 transition-all duration-300"
          >
            <Download size={18} />
            Download Resume
          </a>
          <ContactButton label="Email me" href="mailto:kumarshivamdsdl@gmail.com" />
        </FadeIn>
      </div>
    </section>
  )
}

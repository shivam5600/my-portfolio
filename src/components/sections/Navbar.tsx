import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8 pb-3 backdrop-blur-md bg-ink/40"
      >
        <div className="flex items-center justify-between">
          <a
            href="#top"
            className="hero-heading font-black tracking-tight whitespace-nowrap text-base sm:text-lg md:text-xl"
            aria-label="Home — Kumar Shivam"
          >
            KUMAR SHIVAM
          </a>

          {/* Tablet/desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-haze font-medium uppercase tracking-widest text-sm lg:text-base hover:opacity-70 transition-opacity duration-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/Kumar_Shivam_Resume.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-haze/40 px-4 py-2 text-haze font-medium uppercase tracking-widest text-xs hover:border-haze hover:bg-haze/5 transition-all duration-300"
            >
              Resume
              <Download size={14} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-haze/40 text-haze hover:border-haze active:scale-95 transition-all"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] bg-ink/95 backdrop-blur-xl flex flex-col md:hidden"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <span className="hero-heading font-black text-base tracking-tight">KUMAR SHIVAM</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                }}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-haze/40 text-haze hover:border-haze active:scale-95 transition-all"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-5">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07 }}
                  className="hero-heading font-black uppercase tracking-tight text-4xl sm:text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="/Kumar_Shivam_Resume.pdf"
                download
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-haze text-haze px-8 py-3 font-medium uppercase tracking-widest text-sm hover:bg-haze/10 transition-all duration-300"
              >
                <Download size={18} />
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

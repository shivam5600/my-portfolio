import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/** Mobile-only scroll-down hint pinned to the very bottom of the hero,
 *  centred and small enough that it doesn't overlap the bottom bar
 *  (subline + Contact Me) which sits a bit higher with extra pb. */
export function ScrollHint() {
  return (
    <motion.a
      href="#about"
      aria-label="Scroll down"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-2 z-30 flex flex-col items-center gap-0.5 text-haze/55 hover:text-haze transition-colors"
    >
      <span className="font-medium uppercase tracking-[0.3em] text-[0.5rem] leading-none">
        scroll
      </span>
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
      >
        <ChevronDown size={14} strokeWidth={1.5} />
      </motion.span>
    </motion.a>
  )
}

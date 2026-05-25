import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/** Mobile-only scroll-down hint anchored to the bottom of the hero so users
 *  can see at a glance that the page continues below the fold. */
export function ScrollHint() {
  return (
    <motion.a
      href="#about"
      aria-label="Scroll down"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.6 }}
      className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-3 z-30 flex flex-col items-center gap-1 text-haze/55"
    >
      <span className="font-medium uppercase tracking-[0.3em] text-[0.55rem]">scroll</span>
      <motion.span
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
      >
        <ChevronDown size={18} strokeWidth={1.5} />
      </motion.span>
    </motion.a>
  )
}

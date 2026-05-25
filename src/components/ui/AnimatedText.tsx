import { motion } from 'framer-motion'

/** Word-by-word entrance — visible motion, fires once when the section
 *  enters the viewport, then text stays put. Each word slides up from y:40,
 *  scales from 0.92, un-blurs from 8px, with a 40ms stagger so the wave is
 *  noticeable but the whole paragraph is settled in ~1 s. Gap between words
 *  is margin (not a rendered space) so inline-block whitespace can't strip it. */
export function AnimatedText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const words = text.split(' ')
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.92, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-block',
            marginRight: i < words.length - 1 ? '0.28em' : 0,
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

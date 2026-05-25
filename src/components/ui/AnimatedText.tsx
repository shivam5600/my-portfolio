import { motion } from 'framer-motion'

/** Word-by-word entrance — each word slides up + un-blurs as the section enters
 *  the viewport. Faster cadence so the paragraph reads quickly without making
 *  users wait. Gap between words is a margin (not a rendered space character)
 *  so inline-block whitespace collapse can't strip it. */
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
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.025 } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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

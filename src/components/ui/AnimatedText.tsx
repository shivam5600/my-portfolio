import { motion } from 'framer-motion'

/** Word-by-word entrance animation, fires once when the section scrolls into
 *  view. Each word slides up from y:24 with opacity 0→1, with a small stagger
 *  so the eye reads it as text "arriving" — then it stays. No further work as
 *  the reader scrolls deeper into the section. */
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
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.p>
  )
}

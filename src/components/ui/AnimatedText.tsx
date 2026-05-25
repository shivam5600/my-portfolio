import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

/** Scroll-driven word-by-word opacity reveal. Each word fades from 0.2 → 1 as
 *  it crosses the scroll progress threshold. Spaces are real DOM whitespace so
 *  word-wrap and line breaks behave like a normal paragraph. */
export function AnimatedText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.2'],
  })

  const words = text.split(' ')
  const total = words.length

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / total
        const end = Math.min(1, start + 1.5 / total)
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isLast={i === total - 1}
          />
        )
      })}
    </p>
  )
}

function Word({
  word,
  progress,
  range,
  isLast,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  isLast: boolean
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <>
      <motion.span style={{ opacity }} className="inline">
        {word}
      </motion.span>
      {!isLast && ' '}
    </>
  )
}

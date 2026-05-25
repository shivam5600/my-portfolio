import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

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
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = Array.from(text)

  return (
    <p
      ref={ref}
      className={`relative ${className}`}
      aria-label={text}
    >
      {chars.map((char, i) => {
        const start = i / chars.length
        const end = start + 1 / chars.length
        return (
          <Char
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        )
      })}
    </p>
  )
}

function Char({
  char,
  progress,
  range,
}: {
  char: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block">
      <span className="opacity-0" aria-hidden>
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  )
}

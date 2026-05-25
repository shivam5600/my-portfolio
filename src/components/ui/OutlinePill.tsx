import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type OutlinePillProps = {
  children: ReactNode
  invert?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function OutlinePill({
  children,
  invert = false,
  className = '',
  ...rest
}: OutlinePillProps) {
  const color = invert ? '#0C0C0C' : '#D7E2EA'
  return (
    <button
      className={`rounded-full border-2 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{
        borderColor: color,
        color,
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = invert
          ? 'rgba(12, 12, 12, 0.08)'
          : 'rgba(215, 226, 234, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

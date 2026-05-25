import { type AnchorHTMLAttributes } from 'react'

type ContactButtonProps = {
  label?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function ContactButton({
  label = 'Contact Me',
  href = '#contact',
  className = '',
  ...rest
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`contact-gradient rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base transition-transform duration-300 hover:scale-105 hover:brightness-110 active:scale-95 inline-block ${className}`}
      {...rest}
    >
      {label}
    </a>
  )
}

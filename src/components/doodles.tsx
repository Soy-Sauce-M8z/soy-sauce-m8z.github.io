type DoodleProps = { className?: string }

const base = 'pointer-events-none absolute select-none'

export function SparkleDoodle({ className = '' }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M24 4c1.6 9.4 5 14.4 14 16.8C29 23.2 25.6 28.2 24 37.6 22.4 28.2 19 23.2 10 20.8 19 18.4 22.4 13.4 24 4z" strokeLinejoin="round" />
      <path d="M40 30c.7 3.6 2 5.5 5.5 6.4-3.5.9-4.8 2.8-5.5 6.4-.7-3.6-2-5.5-5.5-6.4 3.5-.9 4.8-2.8 5.5-6.4z" strokeLinejoin="round" />
    </svg>
  )
}

export function SquiggleDoodle({ className = '' }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 40" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M4 26c10-18 20-18 30 0s20 18 30 0 20-18 30 0 14 10 22-4" />
    </svg>
  )
}

export function SmileyDoodle({ className = '' }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="24" cy="24" r="18" />
      <path d="M17 20h.01M31 20h.01" strokeLinecap="round" strokeWidth="2.8" />
      <path d="M16 28c2.4 3.2 5 4.8 8 4.8s5.6-1.6 8-4.8" strokeLinecap="round" />
    </svg>
  )
}

export function FlowerDoodle({ className = '' }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="24" cy="24" r="4.5" />
      <path d="M24 6v8M24 34v8M6 24h8M34 24h8M11 11l5.5 5.5M31.5 31.5L37 37M37 11l-5.5 5.5M16.5 31.5L11 37" />
    </svg>
  )
}

export function ArrowDoodle({ className = '' }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 60" className={`${base} ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 48c18-30 40-38 74-32" />
      <path d="M64 8l17 8-12 12" strokeLinejoin="round" />
    </svg>
  )
}

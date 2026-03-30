const variants = {
  primary: 'bg-primary-light text-primary',
  teal:    'bg-primary-light text-primary',
  amber:   'bg-warning-light text-warning',
  success: 'bg-success-light text-success',
  danger:  'bg-red-50 text-red-600',
  muted:   'bg-cream-deep text-text-sub',
}

export default function Badge({ children, variant = 'muted', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${variants[variant] || variants.muted} ${className}`}>
      {children}
    </span>
  )
}

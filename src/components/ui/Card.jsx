import { forwardRef } from 'react'

const Card = forwardRef(function Card({ children, className = '', hover = true, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`bg-surface border border-cream-deep rounded-xl p-4 ${hover ? 'transition-colors duration-150 hover:bg-surface-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

export default Card

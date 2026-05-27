import type { ButtonHTMLAttributes } from 'react'

type NeonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function NeonButton({
  variant = 'primary',
  className,
  type = 'button',
  children,
  ...props
}: NeonButtonProps) {
  const variantClass = variant === 'ghost' ? ' neon-button--ghost' : ''

  return (
    <button
      type={type}
      className={`neon-button${variantClass}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

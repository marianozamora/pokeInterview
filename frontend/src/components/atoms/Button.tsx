import type { ButtonHTMLAttributes } from 'react'
import type { ButtonVariant } from '@/types/ui'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-red-500 hover:bg-red-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
}

export function Button({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg font-medium text-sm transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="animate-spin inline-block">⟳</span> : children}
    </button>
  )
}

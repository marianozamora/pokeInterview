import type { SizeScale } from '@/types/ui'

type SpinnerProps = {
  size?: SizeScale
  className?: string
}

const sizeClasses: Record<SizeScale, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-16 w-16 border-4',
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`flex justify-center items-center ${className}`}
    >
      <div
        className={`animate-spin rounded-full border-gray-200 border-t-red-500 ${sizeClasses[size]}`}
      />
    </div>
  )
}

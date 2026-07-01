import { getTypeColorClass } from '@utils/pokemon'
import type { PokemonType } from '@/types/ui'

type BadgeProps = {
  label: string
  variant?: PokemonType | string
  className?: string
}

export function Badge({ label, variant, className = '' }: BadgeProps) {
  const colorClass = variant ? getTypeColorClass(variant) : 'bg-gray-500 text-white'

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${colorClass} ${className}`}
    >
      {label}
    </span>
  )
}

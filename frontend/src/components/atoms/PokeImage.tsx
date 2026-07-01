import { useState } from 'react'
import type { SizeScale } from '@/types/ui'

type PokeImageProps = {
  src: string
  alt: string
  size?: SizeScale
  className?: string
}

const sizeClasses: Record<SizeScale, string> = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-48 h-48',
}

const FALLBACK =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'

export function PokeImage({ src, alt, size = 'md', className = '' }: PokeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK)

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`object-contain ${sizeClasses[size]} ${className}`}
      onError={() => setImgSrc(FALLBACK)}
    />
  )
}

import { PokemonCard } from '@molecules/PokemonCard'
import type { Pokemon } from '@/types/pokemon'

type PokemonGridProps = {
  pokemons: Pokemon[]
  className?: string
}

export function PokemonGrid({ pokemons, className = '' }: PokemonGridProps) {
  if (pokemons.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">No Pokémon found.</p>
      </div>
    )
  }

  return (
    <div
      aria-label="Pokemon grid"
      className={`grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ${className}`}
    >
      {pokemons.map(p => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  )
}

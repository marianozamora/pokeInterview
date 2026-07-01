import { Link } from 'react-router-dom'
import { PokeImage } from '@atoms/PokeImage'
import { Badge } from '@atoms/Badge'
import { formatPokemonId } from '@utils/pokemon'
import type { Pokemon } from '@/types/pokemon'

type PokemonCardProps = {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      aria-label={`View details for ${pokemon.name}`}
      className="
        flex flex-col items-center gap-2 p-4
        bg-white rounded-2xl shadow-md
        hover:shadow-lg hover:-translate-y-1
        transition-all duration-200
        border border-gray-100
      "
    >
      <span className="text-xs text-gray-400 self-start font-mono">
        {formatPokemonId(pokemon.id)}
      </span>
      <PokeImage src={pokemon.sprite_url} alt={pokemon.name} size="md" />
      <h3 className="text-sm font-semibold capitalize text-gray-800">{pokemon.name}</h3>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types.map(t => (
          <Badge key={t} label={t} variant={t} />
        ))}
      </div>
    </Link>
  )
}

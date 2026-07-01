import { PokeImage } from '@atoms/PokeImage'
import { Badge } from '@atoms/Badge'
import { StatBox } from '@molecules/StatBox'
import { formatPokemonId, heightToMeters, weightToKg } from '@utils/pokemon'
import type { Pokemon } from '@/types/pokemon'

type PokemonDetailCardProps = {
  pokemon: Pokemon
}

export function PokemonDetailCard({ pokemon }: PokemonDetailCardProps) {
  return (
    <article className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <PokeImage src={pokemon.sprite_url} alt={pokemon.name} size="lg" className="drop-shadow-lg" />
        <div>
          <p className="text-sm font-mono text-gray-400">{formatPokemonId(pokemon.id)}</p>
          <h1 className="text-4xl font-bold capitalize text-gray-800 mt-1">{pokemon.name}</h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {pokemon.types.map(t => (
              <Badge key={t} label={t} variant={t} className="text-sm px-3 py-1" />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatBox label="Height" value={heightToMeters(pokemon.height)} unit="m" />
        <StatBox label="Weight" value={weightToKg(pokemon.weight)} unit="kg" />
      </div>

      <section aria-labelledby="abilities-heading">
        <h2 id="abilities-heading" className="text-lg font-semibold text-gray-700 mb-3">
          Abilities
        </h2>
        <ul className="flex flex-wrap gap-2">
          {pokemon.abilities.map(a => (
            <li key={a} className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm capitalize text-gray-700">
              {a}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

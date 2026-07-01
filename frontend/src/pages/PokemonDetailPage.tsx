import { Link, useParams } from 'react-router-dom'
import { usePokemonDetail } from '@hooks/usePokemonDetail'
import { PokemonDetailCard } from '@organisms/PokemonDetailCard'
import { Spinner } from '@atoms/Spinner'
import { DetailTemplate } from '@templates/DetailTemplate'

export function PokemonDetailPage() {
  const { identifier } = useParams<{ identifier: string }>()
  const { pokemon, loading, error } = usePokemonDetail(identifier)

  const backLink = (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
    >
      ← Back to Pokédex
    </Link>
  )

  const content = loading ? (
    <Spinner size="lg" className="py-20" />
  ) : error || !pokemon ? (
    <div role="alert" className="text-center py-20">
      <p className="text-red-500 text-lg">{error ?? 'Pokémon not found'}</p>
    </div>
  ) : (
    <PokemonDetailCard pokemon={pokemon} />
  )

  return <DetailTemplate backLink={backLink} content={content} />
}

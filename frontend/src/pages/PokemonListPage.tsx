import { usePokemonList } from '@hooks/usePokemonList'
import { PokemonGrid } from '@organisms/PokemonGrid'
import { Pagination } from '@molecules/Pagination'
import { Spinner } from '@atoms/Spinner'
import { ListTemplate } from '@templates/ListTemplate'

const PAGE_SIZE = 20

export function PokemonListPage() {
  const { pokemons, total, loading, error, page, totalPages, goToNextPage, goToPrevPage } =
    usePokemonList(PAGE_SIZE)

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden>⚡</span>
        <h1 className="text-2xl font-bold text-gray-800">Pokédex</h1>
      </div>
      {total > 0 && <span className="text-sm text-gray-500">{total} Pokémon</span>}
    </div>
  )

  const content = error ? (
    <div role="alert" className="text-center py-20">
      <p className="text-red-500 text-lg">{error}</p>
      <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
    </div>
  ) : loading ? (
    <Spinner size="lg" className="py-20" />
  ) : (
    <PokemonGrid pokemons={pokemons} />
  )

  return (
    <ListTemplate
      header={header}
      content={content}
      pagination={
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
        />
      }
    />
  )
}

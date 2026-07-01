import { useState, useEffect, useCallback } from 'react'
import { fetchPokemonList } from '@api/pokemon'
import { clamp } from '@utils/pokemon'
import type { Pokemon } from '@/types/pokemon'

type UsePokemonListState = {
  pokemons: Pokemon[]
  total: number
  loading: boolean
  error: string | null
}

type UsePokemonListReturn = UsePokemonListState & {
  page: number
  totalPages: number
  goToNextPage: () => void
  goToPrevPage: () => void
}

export function usePokemonList(pageSize = 20): UsePokemonListReturn {
  const [page, setPage] = useState(0)
  const [state, setState] = useState<UsePokemonListState>({
    pokemons: [],
    total: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState(prev => ({ ...prev, loading: true, error: null }))

    fetchPokemonList(page * pageSize, pageSize)
      .then(data => {
        if (!cancelled) {
          setState({ pokemons: data.items, total: data.total, loading: false, error: null })
        }
      })
      .catch(err => {
        if (!cancelled) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : 'Unknown error',
          }))
        }
      })

    return () => {
      cancelled = true
    }
  }, [page, pageSize])

  const totalPages = state.total > 0 ? Math.ceil(state.total / pageSize) : 0

  const goToNextPage = useCallback(() => {
    setPage(p => clamp(p + 1, 0, totalPages - 1))
  }, [totalPages])

  const goToPrevPage = useCallback(() => {
    setPage(p => clamp(p - 1, 0, totalPages - 1))
  }, [totalPages])

  return { ...state, page, totalPages, goToNextPage, goToPrevPage }
}

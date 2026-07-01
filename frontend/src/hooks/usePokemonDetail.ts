import { useState, useEffect } from 'react'
import { fetchPokemonDetail } from '@api/pokemon'
import type { Pokemon } from '@/types/pokemon'

type UsePokemonDetailState = {
  pokemon: Pokemon | null
  loading: boolean
  error: string | null
}

export function usePokemonDetail(identifier: string | undefined): UsePokemonDetailState {
  const [state, setState] = useState<UsePokemonDetailState>({
    pokemon: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!identifier) {
      setState({ pokemon: null, loading: false, error: 'No identifier provided' })
      return
    }

    let cancelled = false
    setState({ pokemon: null, loading: true, error: null })

    fetchPokemonDetail(identifier)
      .then(data => {
        if (!cancelled) setState({ pokemon: data, loading: false, error: null })
      })
      .catch(err => {
        if (!cancelled) {
          setState({
            pokemon: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Unknown error',
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [identifier])

  return state
}

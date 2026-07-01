import { buildQueryString } from '@utils/pokemon'
import type { Pokemon, PokemonListResponse } from '@/types/pokemon'

const BASE = '/api/pokemon'

export async function fetchPokemonList(offset = 0, limit = 20): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE}?${buildQueryString({ offset, limit })}`)
  if (!res.ok) throw new Error('Failed to fetch pokemon list')
  return res.json() as Promise<PokemonListResponse>
}

export async function fetchPokemonDetail(identifier: string): Promise<Pokemon> {
  const res = await fetch(`${BASE}/${identifier}`)
  if (!res.ok) throw new Error('Failed to fetch pokemon detail')
  return res.json() as Promise<Pokemon>
}

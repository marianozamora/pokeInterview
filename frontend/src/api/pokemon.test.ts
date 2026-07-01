import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchPokemonList, fetchPokemonDetail } from './pokemon'
import type { Pokemon, PokemonListResponse } from '../types/pokemon'

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
  abilities: ['overgrow', 'chlorophyll'],
  sprite_url: 'https://example.com/bulbasaur.png',
}

const mockListResponse: PokemonListResponse = {
  items: [mockPokemon],
  total: 1,
  offset: 0,
  limit: 20,
}

describe('fetchPokemonList', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns list data on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockListResponse),
    }))
    const result = await fetchPokemonList(0, 20)
    expect(result).toEqual(mockListResponse)
  })

  it('throws when response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    await expect(fetchPokemonList()).rejects.toThrow('Failed to fetch pokemon list')
  })

  it('sends correct query params', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockListResponse),
    })
    vi.stubGlobal('fetch', mockFetch)
    await fetchPokemonList(20, 10)
    expect(mockFetch).toHaveBeenCalledWith('/api/pokemon?offset=20&limit=10')
  })
})

describe('fetchPokemonDetail', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns pokemon data on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPokemon),
    }))
    const result = await fetchPokemonDetail('bulbasaur')
    expect(result).toEqual(mockPokemon)
  })

  it('throws when response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    await expect(fetchPokemonDetail('unknown')).rejects.toThrow('Failed to fetch pokemon detail')
  })

  it('calls correct endpoint', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPokemon),
    })
    vi.stubGlobal('fetch', mockFetch)
    await fetchPokemonDetail('pikachu')
    expect(mockFetch).toHaveBeenCalledWith('/api/pokemon/pikachu')
  })
})

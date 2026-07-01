import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePokemonList } from './usePokemonList'
import * as api from '@api/pokemon'
import type { PokemonListResponse } from '@/types/pokemon'

const mockResponse: PokemonListResponse = {
  items: [
    { id: 1, name: 'bulbasaur', height: 7, weight: 69, types: ['grass'], abilities: ['overgrow'], sprite_url: 'img.png' },
    { id: 2, name: 'ivysaur', height: 10, weight: 130, types: ['grass'], abilities: ['overgrow'], sprite_url: 'img2.png' },
  ],
  total: 151,
  offset: 0,
  limit: 20,
}

describe('usePokemonList', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in loading state', () => {
    vi.spyOn(api, 'fetchPokemonList').mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => usePokemonList())
    expect(result.current.loading).toBe(true)
    expect(result.current.pokemons).toEqual([])
  })

  it('loads pokemons successfully', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockResponse)
    const { result } = renderHook(() => usePokemonList())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pokemons).toHaveLength(2)
    expect(result.current.total).toBe(151)
    expect(result.current.error).toBeNull()
  })

  it('sets error on failure', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => usePokemonList())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Network error')
    expect(result.current.pokemons).toEqual([])
  })

  it('calculates totalPages correctly', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockResponse)
    const { result } = renderHook(() => usePokemonList(20))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.totalPages).toBe(8)
  })

  it('starts on page 0', async () => {
    vi.spyOn(api, 'fetchPokemonList').mockResolvedValue(mockResponse)
    const { result } = renderHook(() => usePokemonList())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.page).toBe(0)
  })
})

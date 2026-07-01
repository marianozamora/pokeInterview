import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { usePokemonDetail } from './usePokemonDetail'
import * as api from '@api/pokemon'
import type { Pokemon } from '@/types/pokemon'

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
  abilities: ['overgrow', 'chlorophyll'],
  sprite_url: 'https://example.com/bulbasaur.png',
}

describe('usePokemonDetail', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('starts in loading state when identifier provided', () => {
    vi.spyOn(api, 'fetchPokemonDetail').mockReturnValue(new Promise(() => {}))
    const { result } = renderHook(() => usePokemonDetail('bulbasaur'))
    expect(result.current.loading).toBe(true)
    expect(result.current.pokemon).toBeNull()
  })

  it('loads pokemon successfully', async () => {
    vi.spyOn(api, 'fetchPokemonDetail').mockResolvedValue(mockPokemon)
    const { result } = renderHook(() => usePokemonDetail('bulbasaur'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.pokemon).toEqual(mockPokemon)
    expect(result.current.error).toBeNull()
  })

  it('sets error when fetch fails', async () => {
    vi.spyOn(api, 'fetchPokemonDetail').mockRejectedValue(new Error('Not found'))
    const { result } = renderHook(() => usePokemonDetail('unknown'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('Not found')
    expect(result.current.pokemon).toBeNull()
  })

  it('handles undefined identifier without fetching', async () => {
    const spy = vi.spyOn(api, 'fetchPokemonDetail')
    const { result } = renderHook(() => usePokemonDetail(undefined))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('No identifier provided')
    expect(spy).not.toHaveBeenCalled()
  })
})

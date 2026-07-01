import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PokemonGrid } from './PokemonGrid'
import type { Pokemon } from '@/types/pokemon'

const mockPokemons: Pokemon[] = [
  { id: 1, name: 'bulbasaur', height: 7, weight: 69, types: ['grass'], abilities: ['overgrow'], sprite_url: 'img1.png' },
  { id: 2, name: 'ivysaur', height: 10, weight: 130, types: ['grass'], abilities: ['overgrow'], sprite_url: 'img2.png' },
  { id: 3, name: 'venusaur', height: 20, weight: 1000, types: ['grass'], abilities: ['overgrow'], sprite_url: 'img3.png' },
]

function renderGrid(pokemons: Pokemon[]) {
  return render(
    <MemoryRouter>
      <PokemonGrid pokemons={pokemons} />
    </MemoryRouter>
  )
}

describe('PokemonGrid', () => {
  it('renders all pokemon cards', () => {
    renderGrid(mockPokemons)
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('ivysaur')).toBeInTheDocument()
    expect(screen.getByText('venusaur')).toBeInTheDocument()
  })

  it('renders correct number of links', () => {
    renderGrid(mockPokemons)
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })

  it('shows empty state when list is empty', () => {
    renderGrid([])
    expect(screen.getByText('No Pokémon found.')).toBeInTheDocument()
  })

  it('does not render grid when empty', () => {
    renderGrid([])
    expect(screen.queryByLabelText('Pokemon grid')).not.toBeInTheDocument()
  })

  it('has aria-label on grid', () => {
    renderGrid(mockPokemons)
    expect(screen.getByLabelText('Pokemon grid')).toBeInTheDocument()
  })
})

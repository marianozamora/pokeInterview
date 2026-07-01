import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PokemonCard } from './PokemonCard'
import type { Pokemon } from '@/types/pokemon'

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
  abilities: ['overgrow'],
  sprite_url: 'https://example.com/bulbasaur.png',
}

function renderCard(pokemon = mockPokemon) {
  return render(
    <MemoryRouter>
      <PokemonCard pokemon={pokemon} />
    </MemoryRouter>
  )
}

describe('PokemonCard', () => {
  it('renders pokemon name', () => {
    renderCard()
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
  })

  it('renders formatted pokemon id', () => {
    renderCard()
    expect(screen.getByText('#001')).toBeInTheDocument()
  })

  it('renders type badges', () => {
    renderCard()
    expect(screen.getByText('grass')).toBeInTheDocument()
    expect(screen.getByText('poison')).toBeInTheDocument()
  })

  it('renders sprite image with alt text', () => {
    renderCard()
    expect(screen.getByAltText('bulbasaur')).toBeInTheDocument()
  })

  it('links to pokemon detail page', () => {
    renderCard()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemon/bulbasaur')
  })

  it('has accessible aria-label', () => {
    renderCard()
    expect(screen.getByLabelText('View details for bulbasaur')).toBeInTheDocument()
  })

  it('pads id with leading zeros', () => {
    renderCard({ ...mockPokemon, id: 25 })
    expect(screen.getByText('#025')).toBeInTheDocument()
  })
})

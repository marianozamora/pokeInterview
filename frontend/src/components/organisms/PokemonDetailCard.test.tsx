import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PokemonDetailCard } from './PokemonDetailCard'
import type { Pokemon } from '@/types/pokemon'

const mockPokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: ['electric'],
  abilities: ['static', 'lightning-rod'],
  sprite_url: 'https://example.com/pikachu.png',
}

describe('PokemonDetailCard', () => {
  it('renders pokemon name as heading', () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />)
    expect(screen.getByRole('heading', { name: 'pikachu' })).toBeInTheDocument()
  })

  it('renders formatted id', () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />)
    expect(screen.getByText('#025')).toBeInTheDocument()
  })

  it('renders type badges', () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />)
    expect(screen.getAllByText('electric').length).toBeGreaterThan(0)
  })

  it('renders height converted to meters', () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />)
    expect(screen.getByText('0.4')).toBeInTheDocument()
  })

  it('renders weight converted to kg', () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />)
    expect(screen.getByText('6.0')).toBeInTheDocument()
  })

  it('renders all abilities', () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />)
    expect(screen.getByText('static')).toBeInTheDocument()
    expect(screen.getByText('lightning-rod')).toBeInTheDocument()
  })

  it('renders Abilities section heading', () => {
    render(<PokemonDetailCard pokemon={mockPokemon} />)
    expect(screen.getByRole('heading', { name: 'Abilities' })).toBeInTheDocument()
  })
})

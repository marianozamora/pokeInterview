import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { PokemonGrid } from './PokemonGrid'
import type { Pokemon } from '@/types/pokemon'

const starters: Pokemon[] = [
  { id: 1, name: 'bulbasaur', height: 7, weight: 69, types: ['grass', 'poison'], abilities: ['overgrow'], sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 4, name: 'charmander', height: 6, weight: 85, types: ['fire'], abilities: ['blaze'], sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 7, name: 'squirtle', height: 5, weight: 90, types: ['water'], abilities: ['torrent'], sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { id: 25, name: 'pikachu', height: 4, weight: 60, types: ['electric'], abilities: ['static'], sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { id: 39, name: 'jigglypuff', height: 5, weight: 55, types: ['normal', 'fairy'], abilities: ['cute-charm'], sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' },
  { id: 94, name: 'gengar', height: 15, weight: 405, types: ['ghost', 'poison'], abilities: ['cursed-body'], sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
]

const meta: Meta<typeof PokemonGrid> = {
  title: 'Organisms/PokemonGrid',
  component: PokemonGrid,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof PokemonGrid>

export const WithPokemons: Story = { args: { pokemons: starters } }
export const Empty: Story = { args: { pokemons: [] } }

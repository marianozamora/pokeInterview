import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { PokemonCard } from './PokemonCard'
import type { Pokemon } from '@/types/pokemon'

const bulbasaur: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
  abilities: ['overgrow', 'chlorophyll'],
  sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
}

const pikachu: Pokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: ['electric'],
  abilities: ['static', 'lightning-rod'],
  sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
}

const meta: Meta<typeof PokemonCard> = {
  title: 'Molecules/PokemonCard',
  component: PokemonCard,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof PokemonCard>

export const DualType: Story = { args: { pokemon: bulbasaur } }
export const SingleType: Story = { args: { pokemon: pikachu } }

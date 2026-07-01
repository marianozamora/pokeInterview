import type { Meta, StoryObj } from '@storybook/react'
import { PokemonDetailCard } from './PokemonDetailCard'
import type { Pokemon } from '@/types/pokemon'

const charizard: Pokemon = {
  id: 6,
  name: 'charizard',
  height: 17,
  weight: 905,
  types: ['fire', 'flying'],
  abilities: ['blaze', 'solar-power'],
  sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
}

const mewtwo: Pokemon = {
  id: 150,
  name: 'mewtwo',
  height: 20,
  weight: 1220,
  types: ['psychic'],
  abilities: ['pressure', 'unnerve'],
  sprite_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
}

const meta: Meta<typeof PokemonDetailCard> = {
  title: 'Organisms/PokemonDetailCard',
  component: PokemonDetailCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof PokemonDetailCard>

export const DualType: Story = { args: { pokemon: charizard } }
export const SingleType: Story = { args: { pokemon: mewtwo } }

import type { Meta, StoryObj } from '@storybook/react'
import { PokeImage } from './PokeImage'

const PIKACHU_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'

const meta: Meta<typeof PokeImage> = {
  title: 'Atoms/PokeImage',
  component: PokeImage,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof PokeImage>

export const Small: Story = { args: { src: PIKACHU_URL, alt: 'pikachu', size: 'sm' } }
export const Medium: Story = { args: { src: PIKACHU_URL, alt: 'pikachu', size: 'md' } }
export const Large: Story = { args: { src: PIKACHU_URL, alt: 'pikachu', size: 'lg' } }
export const BrokenFallback: Story = { args: { src: 'broken-url.png', alt: 'broken', size: 'md' } }

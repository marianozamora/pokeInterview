import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'fire', 'water', 'grass', 'electric', 'psychic', 'ice',
        'dragon', 'dark', 'normal', 'fighting', 'poison', 'ground',
        'flying', 'bug', 'rock', 'ghost', 'steel', 'fairy',
      ],
    },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { label: 'normal', variant: 'normal' } }
export const Fire: Story = { args: { label: 'fire', variant: 'fire' } }
export const Water: Story = { args: { label: 'water', variant: 'water' } }
export const Grass: Story = { args: { label: 'grass', variant: 'grass' } }
export const Electric: Story = { args: { label: 'electric', variant: 'electric' } }
export const Psychic: Story = { args: { label: 'psychic', variant: 'psychic' } }
export const Dragon: Story = { args: { label: 'dragon', variant: 'dragon' } }

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      {['fire','water','grass','electric','psychic','ice','dragon','dark','normal',
        'fighting','poison','ground','flying','bug','rock','ghost','steel','fairy'].map(t => (
        <Badge key={t} label={t} variant={t} />
      ))}
    </div>
  ),
}

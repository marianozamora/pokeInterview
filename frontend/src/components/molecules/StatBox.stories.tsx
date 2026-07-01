import type { Meta, StoryObj } from '@storybook/react'
import { StatBox } from './StatBox'

const meta: Meta<typeof StatBox> = {
  title: 'Molecules/StatBox',
  component: StatBox,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StatBox>

export const Height: Story = { args: { label: 'Height', value: '0.7', unit: 'm' } }
export const Weight: Story = { args: { label: 'Weight', value: '6.9', unit: 'kg' } }
export const WithoutUnit: Story = { args: { label: 'Base XP', value: 64 } }

export const Pair: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 w-80">
      <StatBox label="Height" value="0.7" unit="m" />
      <StatBox label="Weight" value="6.9" unit="kg" />
    </div>
  ),
}

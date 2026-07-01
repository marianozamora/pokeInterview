import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'secondary', 'ghost'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Primary', variant: 'primary' } }
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } }
export const Ghost: Story = { args: { children: 'Ghost', variant: 'ghost' } }
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } }
export const Loading: Story = { args: { children: 'Loading', loading: true } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
}

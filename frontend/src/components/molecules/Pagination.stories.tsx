import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    page: { control: { type: 'number', min: 0 } },
    totalPages: { control: { type: 'number', min: 0 } },
  },
}
export default meta

type Story = StoryObj<typeof Pagination>

export const FirstPage: Story = { args: { page: 0, totalPages: 8, onPrev: () => {}, onNext: () => {} } }
export const MiddlePage: Story = { args: { page: 3, totalPages: 8, onPrev: () => {}, onNext: () => {} } }
export const LastPage: Story = { args: { page: 7, totalPages: 8, onPrev: () => {}, onNext: () => {} } }
export const SinglePage: Story = { args: { page: 0, totalPages: 1, onPrev: () => {}, onNext: () => {} } }

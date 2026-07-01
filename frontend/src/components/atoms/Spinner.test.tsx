import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('renders with status role and aria-label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })

  it('applies sm inner size classes', () => {
    render(<Spinner size="sm" />)
    const inner = screen.getByRole('status').firstChild as HTMLElement
    expect(inner).toHaveClass('h-4', 'w-4')
  })

  it('applies md inner size classes by default', () => {
    render(<Spinner />)
    const inner = screen.getByRole('status').firstChild as HTMLElement
    expect(inner).toHaveClass('h-8', 'w-8')
  })

  it('applies lg inner size classes', () => {
    render(<Spinner size="lg" />)
    const inner = screen.getByRole('status').firstChild as HTMLElement
    expect(inner).toHaveClass('h-16', 'w-16')
  })

  it('applies additional className to wrapper', () => {
    render(<Spinner className="py-20" />)
    expect(screen.getByRole('status')).toHaveClass('py-20')
  })

  it('has animate-spin class on inner div', () => {
    render(<Spinner />)
    const inner = screen.getByRole('status').firstChild as HTMLElement
    expect(inner).toHaveClass('animate-spin')
  })
})

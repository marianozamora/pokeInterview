import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatBox } from './StatBox'

describe('StatBox', () => {
  it('renders label', () => {
    render(<StatBox label="Height" value="1.0" />)
    expect(screen.getByText('Height')).toBeInTheDocument()
  })

  it('renders string value', () => {
    render(<StatBox label="Height" value="1.0" />)
    expect(screen.getByText('1.0')).toBeInTheDocument()
  })

  it('renders numeric value', () => {
    render(<StatBox label="Weight" value={69} />)
    expect(screen.getByText('69')).toBeInTheDocument()
  })

  it('renders unit when provided', () => {
    render(<StatBox label="Height" value="1.0" unit="m" />)
    expect(screen.getByText('m')).toBeInTheDocument()
  })

  it('does not render unit span when not provided', () => {
    render(<StatBox label="Height" value="1.0" />)
    expect(screen.queryByText('m')).not.toBeInTheDocument()
  })

  it('applies additional className', () => {
    const { container } = render(<StatBox label="Test" value="x" className="my-class" />)
    expect(container.firstChild).toHaveClass('my-class')
  })
})

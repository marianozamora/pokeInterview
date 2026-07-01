import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders label text', () => {
    render(<Badge label="fire" />)
    expect(screen.getByText('fire')).toBeInTheDocument()
  })

  it('applies fire variant color', () => {
    render(<Badge label="fire" variant="fire" />)
    expect(screen.getByText('fire')).toHaveClass('bg-orange-500')
  })

  it('applies water variant color', () => {
    render(<Badge label="water" variant="water" />)
    expect(screen.getByText('water')).toHaveClass('bg-blue-500')
  })

  it('applies grass variant color', () => {
    render(<Badge label="grass" variant="grass" />)
    expect(screen.getByText('grass')).toHaveClass('bg-green-500')
  })

  it('uses fallback class for unknown variant', () => {
    render(<Badge label="unknown" variant="unknowntype" />)
    expect(screen.getByText('unknown')).toHaveClass('bg-gray-500')
  })

  it('applies extra className', () => {
    render(<Badge label="test" className="extra" />)
    expect(screen.getByText('test')).toHaveClass('extra')
  })

  it('has capitalize class', () => {
    render(<Badge label="test" />)
    expect(screen.getByText('test')).toHaveClass('capitalize')
  })
})

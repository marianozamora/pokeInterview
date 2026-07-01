import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PokeImage } from './PokeImage'

describe('PokeImage', () => {
  it('renders with correct alt text', () => {
    render(<PokeImage src="test.png" alt="bulbasaur" />)
    expect(screen.getByAltText('bulbasaur')).toBeInTheDocument()
  })

  it('uses provided src', () => {
    render(<PokeImage src="test.png" alt="test" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.png')
  })

  it('applies md size classes by default', () => {
    render(<PokeImage src="test.png" alt="test" />)
    expect(screen.getByRole('img')).toHaveClass('w-24', 'h-24')
  })

  it('applies lg size classes', () => {
    render(<PokeImage src="test.png" alt="test" size="lg" />)
    expect(screen.getByRole('img')).toHaveClass('w-48', 'h-48')
  })

  it('applies sm size classes', () => {
    render(<PokeImage src="test.png" alt="test" size="sm" />)
    expect(screen.getByRole('img')).toHaveClass('w-16', 'h-16')
  })

  it('falls back on image error', () => {
    render(<PokeImage src="broken.png" alt="test" />)
    const img = screen.getByRole('img')
    fireEvent.error(img)
    expect(img.getAttribute('src')).toContain('PokeAPI/sprites')
  })

  it('applies additional className', () => {
    render(<PokeImage src="test.png" alt="test" className="border-2" />)
    expect(screen.getByRole('img')).toHaveClass('border-2')
  })
})

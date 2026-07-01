import { describe, it, expect } from 'vitest'
import {
  formatPokemonId,
  heightToMeters,
  weightToKg,
  getTypeColorClass,
  buildQueryString,
  clamp,
  pipe,
  TYPE_COLORS,
} from './pokemon'

describe('formatPokemonId', () => {
  it('pads single digit id with two zeros', () => {
    expect(formatPokemonId(1)).toBe('#001')
  })

  it('pads two digit id with one zero', () => {
    expect(formatPokemonId(25)).toBe('#025')
  })

  it('does not pad triple digit id', () => {
    expect(formatPokemonId(151)).toBe('#151')
  })
})

describe('heightToMeters', () => {
  it('converts decimetres to metres', () => {
    expect(heightToMeters(7)).toBe('0.7')
  })

  it('formats to one decimal place', () => {
    expect(heightToMeters(10)).toBe('1.0')
  })

  it('handles large values', () => {
    expect(heightToMeters(145)).toBe('14.5')
  })
})

describe('weightToKg', () => {
  it('converts hectograms to kg', () => {
    expect(weightToKg(69)).toBe('6.9')
  })

  it('formats to one decimal place', () => {
    expect(weightToKg(900)).toBe('90.0')
  })
})

describe('getTypeColorClass', () => {
  it('returns fire color class', () => {
    expect(getTypeColorClass('fire')).toBe(TYPE_COLORS['fire'])
  })

  it('returns water color class', () => {
    expect(getTypeColorClass('water')).toBe(TYPE_COLORS['water'])
  })

  it('returns fallback for unknown type', () => {
    expect(getTypeColorClass('unknowntype')).toBe('bg-gray-500 text-white')
  })
})

describe('buildQueryString', () => {
  it('builds a simple query string', () => {
    expect(buildQueryString({ offset: 0, limit: 20 })).toBe('offset=0&limit=20')
  })

  it('encodes special characters', () => {
    const qs = buildQueryString({ name: 'mr. mime' })
    expect(qs).toContain('mr.')
  })
})

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('clamps to min', () => {
    expect(clamp(-1, 0, 10)).toBe(0)
  })

  it('clamps to max', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })
})

describe('pipe', () => {
  it('applies functions left to right', () => {
    const double = (n: number) => n * 2
    const addOne = (n: number) => n + 1
    expect(pipe(double, addOne)(3)).toBe(7)
  })

  it('works with a single function', () => {
    const negate = (n: number) => -n
    expect(pipe(negate)(5)).toBe(-5)
  })
})

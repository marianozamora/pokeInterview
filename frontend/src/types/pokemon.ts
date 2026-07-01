export type Pokemon = {
  id: number
  name: string
  height: number
  weight: number
  types: string[]
  abilities: string[]
  sprite_url: string
}

export type PokemonListResponse = {
  items: Pokemon[]
  total: number
  offset: number
  limit: number
}

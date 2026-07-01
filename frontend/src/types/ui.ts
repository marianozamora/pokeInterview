export type PokemonType =
  | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice'
  | 'dragon' | 'dark' | 'normal' | 'fighting' | 'poison' | 'ground'
  | 'flying' | 'bug' | 'rock' | 'ghost' | 'steel' | 'fairy'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export type SizeScale = 'sm' | 'md' | 'lg'

export type PaginationState = {
  page: number
  totalPages: number
}

export const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-green-500 text-white',
  electric: 'bg-yellow-400 text-gray-900',
  psychic: 'bg-pink-500 text-white',
  ice: 'bg-cyan-400 text-gray-900',
  dragon: 'bg-purple-600 text-white',
  dark: 'bg-gray-800 text-white',
  normal: 'bg-gray-400 text-white',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-yellow-700 text-white',
  flying: 'bg-sky-400 text-white',
  bug: 'bg-lime-500 text-white',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-violet-700 text-white',
  steel: 'bg-slate-400 text-white',
  fairy: 'bg-pink-300 text-gray-900',
}

export const getTypeColorClass = (type: string): string =>
  TYPE_COLORS[type] ?? 'bg-gray-500 text-white'

export const formatPokemonId = (id: number): string =>
  `#${String(id).padStart(3, '0')}`

export const heightToMeters = (height: number): string =>
  (height / 10).toFixed(1)

export const weightToKg = (weight: number): string =>
  (weight / 10).toFixed(1)

export const buildQueryString = (params: Record<string, string | number>): string =>
  Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

export const pipe =
  <T>(...fns: ReadonlyArray<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value)

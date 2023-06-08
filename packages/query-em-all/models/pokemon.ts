export interface PokemonGeneration {
  pokemon: PartialPokemon[]
  region: string
  name: string
}

export interface PartialPokemon {
  name: string
  id: number
}

export interface Pokemon {
  name: string
  id: number
  sprites: {
    front_default: string
    back_default: string
  }
  abilities: Array<{
    ability: { name: string; url: string }
    is_hidden: boolean
    slot: number
  }>
  moves: Array<{ move: { name: string; url: string } }>
  types: Array<{
    slot: number
    type: { name: string; url: string }
  }>
}

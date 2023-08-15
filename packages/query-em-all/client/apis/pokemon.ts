import request from 'superagent'
import type { Pokemon, PokemonGeneration } from '../../models/pokemon.ts'

export async function fetchPokemonGeneration(
  generation: number
): Promise<PokemonGeneration> {
  return request
    .get(`/api/v1/pokemon/generation/${generation}`)
    .then((res) => res.body.generation)
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  return request.get(`/api/v1/pokemon/${name}`).then((res) => res.body.pokemon)
}

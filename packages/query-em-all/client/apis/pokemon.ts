import request from 'superagent'
import type { Pokemon, PokemonGeneration } from '../../models/pokemon'

export async function fetchPokemonGeneration(generation: number) {
  return request
    .get(`/api/v1/pokemon/generation/${generation}`)
    .then((res) => res.body.generation as PokemonGeneration)
}

export async function fetchPokemonByName(name: string) {
  return request
    .get(`/api/v1/pokemon/${name}`)
    .then((res) => res.body.pokemon as Pokemon)
}

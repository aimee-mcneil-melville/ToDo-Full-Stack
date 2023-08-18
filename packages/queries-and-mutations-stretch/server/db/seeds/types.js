import data from '../data/pokemon.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('types').del()

  // Create a unique set of types
  // e.g., Set { 'Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug', 'Normal' }
  const typeSet = data.forEach((p) => {
    p.type.forEach((t) => {
      typeSet.add(t)
    })
  })

  // Create an array of types
  // e.g., [ { id: 1, name: 'Grass' }, { id: 2, name: 'Poison' }, ... ]
  const types = Array.from(typeSet).map((type, i) => ({
    id: i + 1,
    name: type,
  }))

  const pokemonTypes = data
    .map((p) => {
      return p.type.map((t) => ({
        pokemon_id: p.id,
        type_id: types.find((type) => type.name === t)?.id,
      }))
    })
    .flat()

  await knex('types').insert(types)
  await knex('pokemon_types').insert(pokemonTypes)
}

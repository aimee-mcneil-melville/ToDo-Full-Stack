import data from '../data/pokemon.ts'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('pokemon').del()

  const pokemon = data.map((p) => ({
    id: p.id,
    name: p.name,
  }))

  await knex('pokemon').insert(pokemon)
}

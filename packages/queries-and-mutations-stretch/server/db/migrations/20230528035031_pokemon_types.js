/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  await knex.schema.createTable('pokemon_types', (table) => {
    table.integer('pokemon_id').unsigned().notNullable()
    table.integer('type_id').unsigned().notNullable()

    table.foreign('pokemon_id').references('pokemon.id')
    table.foreign('type_id').references('types.id')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('pokemon_types')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  await knex.schema.createTable('types', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
  })
}

export async function down(knex) {
  await knex.schema.dropTable('types')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('todos', (table) => {
    table.increments('id').primary()
    table.string('task').notNullable()
    table.boolean('completed').defaultTo(false)
    table.integer('priority').defaultTo(0)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('todos')
}

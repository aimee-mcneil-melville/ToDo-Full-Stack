export function up(knex) {
  return knex.schema.table('todos', (table) => {
    table.boolean('completed')
  })
}

export function down(knex) {
  return knex.schema.table('todos', (table) => {
    table.dropColumn('completed')
  })
}

export function up(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary()
    table.string('task')
  })
}

export function down(knex) {
  return knex.schema.dropTable('todos')
}

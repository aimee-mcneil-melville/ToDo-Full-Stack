export function up(knex) {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
  })
}

export function down(knex) {
  return knex.schema.dropTable('locations')
}

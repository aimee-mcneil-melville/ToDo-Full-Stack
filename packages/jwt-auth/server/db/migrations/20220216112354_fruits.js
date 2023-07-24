export function up(knex) {
  return knex.schema.createTable('fruits', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('average_grams_each')
    table.string('added_by_user')
  })
}

export function down(knex) {
  return knex.schema.dropTable('fruits')
}

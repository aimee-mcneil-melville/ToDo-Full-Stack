export function up(knex) {
  return knex.schema.createTable('rubbish', function (table) {
    table.increments('id').primary()
    table.string('name')
  })
}

export function down(knex) {
  return knex.schema.dropTable('rubbish')
}

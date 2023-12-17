export async function up(knex) {
  await knex.schema.createTable('locations', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('locations')
}

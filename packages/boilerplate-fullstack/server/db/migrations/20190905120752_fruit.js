export async function up(knex) {
  await knex.schema.createTable('fruit', (table) => {
    table.increments('id')
    table.string('name')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('fruit')
}

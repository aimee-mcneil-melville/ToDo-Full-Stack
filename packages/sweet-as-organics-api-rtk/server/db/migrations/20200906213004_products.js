export async function up(knex) {
  await knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('description')
    table.string('name')
    table.string('country')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('products')
}

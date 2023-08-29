export async function up(knex) {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id')
    table.string('status')
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  await knex.schema.dropTable('orders')
}

export async function up(knex) {
  await knex.schema.createTable('orders', (table) => {
    table.increments('id')
    table.date('created_at')
    table.string('status')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('orders')
}

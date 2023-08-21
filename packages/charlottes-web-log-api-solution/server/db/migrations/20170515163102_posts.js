export async function up(knex) {
  await knex.schema.createTable('Posts', (table) => {
    table.increments().primary()
    table.string('title')
    table.date('date_created')
    table.string('text')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('Posts')
}

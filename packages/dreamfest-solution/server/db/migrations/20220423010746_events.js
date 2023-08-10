export async function up (knex) {
  await knex.schema.createTable('events', (table) => {
    table.increments('id').primary()
    table.integer('location_id').references('locations.id')
    table.string('day')
    table.string('time')
    table.string('name')
    table.string('description')
  })
}

export async function down (knex) {
  await knex.schema.dropTable('events')
}

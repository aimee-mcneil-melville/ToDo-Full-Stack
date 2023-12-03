export function up(knex) {
  return knex.schema.createTable('airplanes', (table) => {
    table.increments('id').primary()
    table.string('model')
    table.integer('capacity')
  })
}

export function down(knex) {
  return knex.schema.dropTable('airplanes')
}

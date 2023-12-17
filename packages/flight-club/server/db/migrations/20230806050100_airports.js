export function up(knex) {
  return knex.schema.createTable('airports', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('phone').notNullable()
    table.string('email').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('airports')
}

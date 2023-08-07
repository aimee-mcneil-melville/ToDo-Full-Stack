export async function up (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('auth0_id')
    table.string('name')
    table.string('email')
    table.string('description')
  })
}

export async function down (knex) {
  await knex.schema.dropTable('users')
}

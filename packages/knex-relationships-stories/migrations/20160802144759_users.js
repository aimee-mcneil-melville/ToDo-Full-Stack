export const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('email')
  })
}

export const down = (knex) => {
  return knex.schema.dropTable('users')
}

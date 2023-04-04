import { Knex } from "knex"

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id')
    table.string('username')
    table.string('hash')
    table.string('first_name')
    table.string('last_name')
    table.decimal('hourly_wage')
    table.timestamps(true, true)
  })
}

exports.down = function (knex:Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

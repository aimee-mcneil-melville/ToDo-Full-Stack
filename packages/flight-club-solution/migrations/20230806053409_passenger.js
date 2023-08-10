export function up(knex) {
  return knex.schema.createTable('passengers', (table) => {
    table.increments('id').primary()
    table.string('dob').notNullable()
    table.string('fullname').notNullable()
    table.string('job_title').notNullable()
    table.string('phone').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('passengers')
}

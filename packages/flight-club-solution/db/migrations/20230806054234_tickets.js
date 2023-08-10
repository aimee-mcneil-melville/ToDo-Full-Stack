export function up(knex) {
  return knex.schema.createTable('tickets', (table) => {
    table.increments('id').primary()
    table.integer('airplane_id').references('airplanes.id')
    table.integer('passenger_id').references('passengers.id')
    table.string('flight_number')
    table.integer('departure_airport_id').references('airports.id')
    table.integer('arrival_airport_id').references('airports.id')
    table.string('departure_time')
    table.string('arrival_time')
  })
}

export function down(knex) {
  return knex.schema.dropTable('tickets')
}

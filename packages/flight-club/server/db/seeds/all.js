import { faker } from '@faker-js/faker'

export async function seed(knex) {
  faker.seed(123)
  // Deletes ALL existing entries
  await knex('luggage').del()
  await knex('tickets').del()
  await knex('airplanes').del()
  await knex('passengers').del()
  await knex('airports').del()

  // the codes below represent the students birth dates
  const passengersDobs = [
    '0610',
    '2611',
    '1303',
    '2011',
    '2710',
    '1510',
    '1211',
    '2712',
    '2512',
    '0107',
    '1310',
    '1512',
  ]

  const airportIds = await insertAirports(knex)
  const passengerIds = await insertPassengers(knex, passengersDobs)
  const airplaneIds = await insertAirplanes(knex)

  // insert 10 tickets for each airplane
  // with random passenger and airport
  const tickets = Array.from({ length: 10 }).map((_, i) => {
    const ticketTotal = faker.number.int({ min: 1, max: 5 })
    return Array.from({ length: ticketTotal }).map((_, j) => {
      const departureTime = faker.date.past()
      const arrival_time =
        departureTime.getTime() +
        1000 * 60 * 60 * faker.number.int({ min: 1, max: 10 })

      return {
        id: i * 10 + j + 1,
        airplane_id: faker.helpers.arrayElement(airplaneIds),
        passenger_id: faker.helpers.arrayElement(passengerIds),
        departure_airport_id: faker.helpers.arrayElement(airportIds),
        arrival_airport_id: faker.helpers.arrayElement(airportIds),
        departure_time: departureTime,
        arrival_time: arrival_time,
        flight_number: faker.airline.flightNumber(),
      }
    })
  })

  await knex('tickets').insert(tickets.flat())
  const ticketIds = await knex('tickets').pluck('id')
  //
  // insert 10 luggages for each flight with random weight and passenger
  const luggage = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    weight: faker.number.int({ min: 7, max: 40 }),
    is_lost: faker.datatype.boolean(),
    ticket_id: faker.helpers.arrayElement(ticketIds),
    located_airport_id: faker.helpers.arrayElement(airportIds),
    is_suspicious: faker.helpers.weightedArrayElement([
      { weight: 10, value: false }, // 90% chance of false
      { weight: 1, value: true }, // 10% chance of true
    ]),
  }))

  await knex('luggage').insert(luggage)
}

async function insertAirports(knex) {
  const airports = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: faker.airline.airport().name,
    phone: faker.phone.number('+## ### ### ####'),
    email: `support@${faker.airline.airport().name.replace(/\s/g, '')}.com`,
  }))

  await knex('airports').insert(airports)
  return await knex('airports').pluck('id')
}

async function insertPassengers(knex, dobs) {
  const passengers = dobs.map((user, i) => ({
    id: i + 1,
    dob: user,
    fullname: faker.person.fullName(),
    job_title: faker.person.jobTitle(),
    phone: faker.phone.number('+## ### ### ####'),
  }))

  await knex('passengers').insert(passengers)
  return await knex('passengers').pluck('id')
}

async function insertAirplanes(knex) {
  const airplanes = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    model: faker.airline.airplane().name,
    capacity: faker.number.int({ min: 100, max: 300 }),
  }))

  await knex('airplanes').insert(airplanes)
  return await knex('airplanes').pluck('id')
}

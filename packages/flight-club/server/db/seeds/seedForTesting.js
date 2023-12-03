import { faker } from '@faker-js/faker'

export async function seed(knex) {
  faker.seed(321)
  // Deletes ALL existing entries
  await knex('luggage').del()
  await knex('tickets').del()
  await knex('airplanes').del()
  await knex('passengers').del()
  await knex('airports').del()

  const passengersDobs = ['9999']

  const [departure, arrival] = await insertAirports(knex)
  const passengerIds = await insertPassengers(knex, passengersDobs)
  const [airplaneId] = await insertAirplanes(knex)

  const tickets = Array.from({ length: 1 }).map((_, i) => {
    const departureTime = faker.date.past()
    const arrival_time = departureTime.getTime() + 1000 * 60 * 60 * 2

    return {
      id: i,
      airplane_id: airplaneId,
      passenger_id: passengerIds[0],
      departure_airport_id: departure,
      arrival_airport_id: arrival,
      departure_time: departureTime,
      arrival_time: arrival_time,
      flight_number: 123,
    }
  })

  await knex('tickets').insert(tickets)
  const [ticketId] = await knex('tickets').pluck('id')
  //
  // insert 10 luggages for each flight with random weight and passenger
  const luggage = Array.from({ length: 1 }).map((_, i) => ({
    id: i + 1,
    weight: 20,
    is_lost: true,
    ticket_id: ticketId,
    located_airport_id: arrival,
    is_suspicious: true,
  }))

  await knex('luggage').insert(luggage)
}

async function insertAirports(knex) {
  const airports = Array.from({ length: 2 }).map((_, i) => ({
    id: i + 1,
    name: `airport ${i}`,
    phone: '0800-test-airport',
    email: 'test@airport.com',
  }))

  await knex('airports').insert(airports)
  return await knex('airports').pluck('id')
}

async function insertPassengers(knex, dobs) {
  const passengers = dobs.map((user, i) => ({
    id: i + 1,
    dob: user,
    fullname: 'test user',
    job_title: 'test job',
    phone: '0800-test-user',
  }))

  await knex('passengers').insert(passengers)
  return await knex('passengers').pluck('id')
}

async function insertAirplanes(knex) {
  const airplanes = Array.from({ length: 1 }).map((_, i) => ({
    id: i + 1,
    model: faker.airline.airplane().name,
    capacity: 300,
  }))

  await knex('airplanes').insert(airplanes)
  return await knex('airplanes').pluck('id')
}

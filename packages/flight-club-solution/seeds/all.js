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
  const passengers = [
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

  // insert airports
  await Promise.all(
    Array.from({ length: 12 }).map(async (_, i) => {
      await knex('airports').insert({
        id: i + 1,
        name: faker.airline.airport().name,
        phone: faker.phone.number('+## ### ### ####'),
        email: `support@${faker.airline.airport().name.replace(/\s/g, '')}.com`,
      })
    })
  )

  // insert passengers
  await Promise.all(
    passengers.map(async (user, i) => {
      await knex('passengers').insert({
        id: i + 1,
        dob: user,
        fullname: faker.person.fullName(),
        job_title: faker.person.jobTitle(),
        phone: faker.phone.number('+## ### ### ####'),
      })
    })
  )

  // insert 10 airplanes
  await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      await knex('airplanes').insert({
        id: i + 1,
        model: faker.airline.airplane().name,
        capacity: faker.number.int({ min: 100, max: 300 }),
      })
    })
  )

  const airportIds = await knex('airports').pluck('id')
  const passengerIds = await knex('passengers').pluck('id')
  const airplaneIds = await knex('airplanes').pluck('id')

  // insert 10 tickets for each airplane
  // with random passenger and airport
  await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const ticketTotal = faker.number.int({ min: 1, max: 5 })
      await Promise.all(
        Array.from({ length: ticketTotal }).map(async (_, j) => {
          const departureTime = faker.date.past()
          const arrival_time =
            departureTime.getTime() +
            1000 * 60 * 60 * faker.number.int({ min: 1, max: 10 })

          await knex('tickets').insert({
            id: i * 10 + j + 1,
            airplane_id: faker.helpers.arrayElement(airplaneIds),
            passenger_id: faker.helpers.arrayElement(passengerIds),
            departure_airport_id: faker.helpers.arrayElement(airportIds),
            arrival_airport_id: faker.helpers.arrayElement(airportIds),
            departure_time: departureTime,
            arrival_time: arrival_time,
            flight_number: faker.airline.flightNumber(),
          })
        })
      )
    })
  )

  const ticketIds = await knex('tickets').pluck('id')
  // insert 10 luggages for each flight with random weight and passenger
  await Promise.all(
    Array.from({ length: 50 }).map(async (_, i) => {
      await knex('luggage').insert({
        id: i + 1,
        weight: faker.number.int({ min: 7, max: 40 }),
        is_lost: faker.datatype.boolean(),
        ticket_id: faker.helpers.arrayElement(ticketIds),
        located_airport_id: faker.helpers.arrayElement(airportIds),
        is_suspicious: faker.helpers.weightedArrayElement([
          { weight: 10, value: false }, // 90% chance of false
          { weight: 1, value: true }, // 10% chance of true
        ]),
      })
    })
  )
}

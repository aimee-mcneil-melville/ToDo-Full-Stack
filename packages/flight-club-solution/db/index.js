import knex from 'knex'
import knexfile from './knexfile.js'

const db = knex(knexfile.development)

export async function getMyTickets(passengerId) {
  // TODO: use where to filter tickets by passengerId
  return await db('tickets').select().where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  const tickets = await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .select('tickets.*')
  return tickets
}

export async function countMyTicketsByDob(dob) {
  const tickets = await getMyTicketsByDob(dob)
  const length = tickets.length
  return { count: length }
}

export async function countMyLostLuggage(dob) {
  const lostLuggCount = await db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .andWhere('luggage.is_lost', true)
    .count('luggage.id as luggCount')
    .first()
  return { count: lostLuggCount.luggCount }
}

export async function sumMyLostLuggageWeight(dob) {
  const lostLugg = await db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .andWhere('luggage.is_lost', true)

  const totalWeight = lostLugg.reduce(
    (accumulator, currentlug) => accumulator + currentlug.weight,
    0
  )
  return { sum: totalWeight }
}

export async function getMyLostLuggageLocation(dob) {
  const lostLugg = await db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('airports', 'located_airport_id', 'airports.id')
    .where('passengers.dob', dob)
    .andWhere('luggage.is_lost', true)
  return lostLugg
}

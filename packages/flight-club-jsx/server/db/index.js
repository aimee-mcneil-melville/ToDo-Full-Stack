import db from './connection.js'

export async function getMyTickets(passengerId) {
  // TODO: use where to filter tickets by passengerId
  return await db('tickets').select().where('passenger_id', passengerId)
}

export async function getMyTicketsByDob(dob) {
  return await db('tickets')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .where('dob', dob)
}

export async function countMyTicketsByDob(dob) {
  return await db('tickets')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .where('passengers.dob', dob)
    .count('tickets.id as count')
    .first()
}

export async function countMyLostLuggage(dob) {
  return await db('tickets')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .where('passengers.dob', dob)
    .where('is_lost', true)
    .count('luggage.id as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob) {
  return await db('tickets')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .where('passengers.dob', dob)
    .where('is_lost', true)
    .sum('weight as sum')
    .first()
}

export async function getMyLostLuggageLocation(dob) {
  return await db('tickets')
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .join('luggage', 'luggage.ticket_id', 'tickets.id')
    .join('airports', 'airports.id', 'luggage.located_airport_id')
    .where('passengers.dob', dob)
    .where('is_lost', true)
    .select('airports.phone', 'airports.email')
    .first()
}

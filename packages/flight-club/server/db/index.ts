import db from './connection.ts'

export async function getMyTickets(passengerId: number) {
  return db('tickets').where({ passenger_id: passengerId }).select('tickets.*')
}

export async function getMyTicketsByDob(dob: string) {
  return db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
}

export async function countMyTicketsByDob(dob: string) {
  return await db('tickets')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .groupBy('passengers.dob')
    .where('passengers.dob', dob)
    .count('* as count')
    .first()
}

export async function countMyLostLuggage(dob: string) {
  return await db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .andWhere('luggage.is_lost', true)
    .count('luggage.id as count')
    .first()
}

export async function sumMyLostLuggageWeight(dob: string) {
  return await db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .where('passengers.dob', dob)
    .andWhere('luggage.is_lost', true)
    .sum('luggage.weight as sum')
    .first()
}

export async function getMyLostLuggageLocation(dob: string) {
  const lostLugg = await db('luggage')
    .join('tickets', 'luggage.ticket_id', 'tickets.id')
    .join('passengers', 'tickets.passenger_id', 'passengers.id')
    .join('airports', 'located_airport_id', 'airports.id')
    .where('passengers.dob', dob)
    .andWhere('luggage.is_lost', true)
    .first()

  return lostLugg
}

interface Ticket {
  carrier: string
  name: string
  from: string
  to: string
  flightNo: string
  date: string
  seat: string
  class: string
  ticketNo: string
  gate: string
  departure: string
  arrival: string
}

export async function fullTicketInfo(id: string): Promise<Ticket | undefined> {
  return db('tickets')
    .join(
      'airports as departure_airport',
      'departure_airport.id',
      'tickets.departure_airport_id'
    )
    .join(
      'airports as arrival_airport',
      'arrival_airport.id',
      'tickets.arrival_airport_id'
    )
    .join('passengers', 'passengers.id', 'tickets.passenger_id')
    .join('airplanes', 'airplanes.id', 'tickets.airplane_id')
    .select(
      'tickets.flight_number as flightNo',
      'tickets.id as ticketNo',
      'tickets.departure_time as departure',
      'tickets.arrival_time as arrival',

      'passengers.fullname as name',
      'departure_airport.name as from',
      'arrival_airport.name as to'
    )
    .where('tickets.id', id)
    .first()
}

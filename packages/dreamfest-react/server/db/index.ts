import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
const db = knex(config)

export async function getAllLocations() {
  const locations = await db('locations').select('*')
  return locations as Location[]
}

export async function getLocationById(id: number) {
  const location = await db('locations').where({ id }).first()
  return location as Location
}

export async function updateLocation(id: number, data: Partial<LocationData>) {
  const [location] = await db('locations')
    .update(data)
    .where({ id })
    .returning('*')

  return location as Location
}

export async function createlocation(location: LocationData) {
  const [id] = await db('locations').insert(location)
  return id
}

export async function getEventsForDay(day: string) {
  const events = await db('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where({ day })
    .select(
      '*',
      'events.id as id',
      'location_id as locationId',
      'events.name as eventName',
      'locations.name as locationName',
      'events.description as description'
    )

  return events as EventWithLocation[]
}

export async function getEventById(id: number) {
  const result = await db('events').where({ id }).first()
  if (result == undefined) {
    return undefined
  }

  const { location_id, ...data } = result
  return {
    ...data,
    locationId: location_id,
  } as Event
}

export async function deleteEvent(id: number) {
  await db('events').delete().where({ id })
}

export async function updateEvent(id: number, data: Partial<EventData>) {
  const { locationId: location_id, ...data_ } = data
  const [event] = await db('events')
    .update({ location_id, ...data_ })
    .where({ id })
    .returning('*')

  return event as Event
}

export async function createEvent(event: EventData) {
  const { locationId: location_id, ...data } = event
  const [id] = await db('events')
    .insert({ location_id, ...data })
    .returning('id')
  return id
}

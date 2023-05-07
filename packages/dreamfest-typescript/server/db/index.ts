import knexFile from './knexfile'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location'
import type { Event, EventData, EventWithLocation } from '../../models/Event'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
const db = knex(config)

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
}

// TODO: write some more database functions

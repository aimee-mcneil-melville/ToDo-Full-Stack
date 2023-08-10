import knexFile, { Knex } from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

// @ts-expect-error https://github.com/knex/knex/issues/5358
export const connection: Knex = knex(config)

export async function getAllLocations() {
  // TODO: use knex to get the real location data from the database
}

// TODO: write some more database functions

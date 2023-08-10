import knex, { Knex } from 'knex'
import knexfile from './knexfile.js'

type Environment = 'development' | 'test' | 'production'
const env = (process.env.NODE_ENV || 'development') as Environment

// @ts-expect-error https://github.com/knex/knex/issues/5358
const connection: Knex = knex(knexfile[env])

export default connection

import knex, { Knex } from 'knex'
import config from './knexfile.js'

type Environment = 'development' | 'production' | 'test'
const env = (process.env.NODE_ENV as Environment) || 'development'

// @ts-expect-error https://github.com/knex/knex/issues/5358
const connection: Knex = knex(config[env])

export default connection

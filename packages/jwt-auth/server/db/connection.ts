import knexFile from './knexfile.js'
import knex, { Knex } from 'knex'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]

// @ts-expect-error https://github.com/knex/knex/issues/5358
const connection: Knex = knex(config)

export default connection

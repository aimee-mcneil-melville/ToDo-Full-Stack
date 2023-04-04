import knex from 'knex'
import knexfile from './knexfile'

type Environment = 'production' | 'test' | 'development'

const env = (process.env.NODE_ENV || 'development') as Environment
const connection = knex(knexfile[env])

export default connection

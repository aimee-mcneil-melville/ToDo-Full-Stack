import knex from 'knex'
import config from './knexfile'

type Environment = 'development' | 'production' | 'test'
const env = (process.env.NODE_ENV || 'development') as Environment
const connection = knex(config[env])

export default connection

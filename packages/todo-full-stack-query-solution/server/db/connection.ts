import knex from 'knex'
import knexfile from './knexfile.js'

type Environment = 'development' | 'test' | 'production'
const env = (process.env.NODE_ENV || 'development') as Environment

const connection = knex(knexfile[env])

export default connection

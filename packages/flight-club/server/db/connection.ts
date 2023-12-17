import knex from 'knex'
import knexfile from './knexfile.js'

type Environment = 'development' | 'test'
const env = (process.env.NODE_ENV || 'development') as Environment
const db = knex(knexfile[env])
export default db

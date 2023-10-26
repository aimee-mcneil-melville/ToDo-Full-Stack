import knexfile from './knexfile.js'
import knex from 'knex'

type Environment = 'test' | 'production' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const connection = knex(knexfile[environment])
export default connection

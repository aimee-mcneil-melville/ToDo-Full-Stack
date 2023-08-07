import knex from 'knex'
import config from './knexfile.js'
 
type Environment = 'development' | 'production' | 'test'
const env = (process.env.NODE_ENV as Environment) || 'development'
const connection = knex.default(config[env])

export default connection

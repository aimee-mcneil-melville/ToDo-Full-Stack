import knex from 'knex'
import knexfile from './knexfile.mjs'

const environment = process.env.NODE_ENV || 'development'
export default knex(knexfile[environment])

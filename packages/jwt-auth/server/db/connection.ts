import knexFile from './knexfile'
import knex from 'knex'

const environment = process.env.NODE_ENV || 'development'
const config = knexFile[environment]
export const connection = knex(config)

import knexFile from './knexfile'
import knex from 'knex'

const config = knexFile.development
// eslint-disable-next-line no-unused-vars
const connection = knex(config)

export default {}

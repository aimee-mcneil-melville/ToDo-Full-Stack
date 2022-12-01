import knex from 'knex'
import config from './knexfile'

type Config = typeof config
type ConfigKeys = keyof Config

const env = (process.env.NODE_ENV as ConfigKeys) || 'development'
const connection = knex(config[env])

module.exports = connection

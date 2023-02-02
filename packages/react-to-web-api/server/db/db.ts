import config from './knexfile'
import knex from 'knex'
import { Widget } from '../../models/Widget'

type Environment = 'production' | 'test' | 'development'
const environment = (process.env.NODE_ENV as Environment) || 'development'
const connection = knex(config[environment])

export function getWidgets(db = connection): Promise<Widget[]> {
  return db('widgets').select()
}

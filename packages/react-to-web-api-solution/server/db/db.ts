import config from './knexfile'
import knex from 'knex'
import { Widget, NewWidget } from '../../models/Widget'

type Environment = 'production' | 'test' | 'development'
const environment = (process.env.NODE_ENV as Environment) || 'development'
const connection = knex(config[environment])

export function getWidgets(db = connection): Promise<Widget[]> {
  return db('widgets').select()
}

export function addWidget(
  widget: NewWidget,
  db = connection
): Promise<number[]> {
  return db('widgets').insert(widget)
}

export function delWidget(id: number, db = connection): Promise<number[]> {
  return db('widgets').where({ id }).del()
}

export function updateWidget(
  id: number,
  widget: NewWidget,
  db = connection
): Promise<number[]> {
  return db('widgets').where({ id }).update(widget)
}

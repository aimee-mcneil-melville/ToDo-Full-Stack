import { Widget, NewWidget } from '../../models/Widget'
import connection from './connection'

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

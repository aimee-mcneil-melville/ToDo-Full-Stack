const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

export type TWidget = {
  id: number
  name: string
  price: number
  mfg: string
  inStock: number
}

export function getWidgets(db = connection): Promise<Array<TWidget>> {
  return db('widgets').select()
}

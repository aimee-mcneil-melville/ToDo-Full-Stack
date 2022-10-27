const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)



export function getWidgets(db = connection): any {
  return db('widgets').select()
}

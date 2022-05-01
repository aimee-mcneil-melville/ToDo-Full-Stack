const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getAllLocations,
  getLocationById,
  updateLocation,
  getEventsByDay,
  addNewEvent,
  deleteEvent,
  getEventById,
}

// LOCATIONS

function getAllLocations(db = connection) {
  return db('locations').select()
}

function getLocationById(id, db = connection) {
  return db('locations').where('id', id).select()
}

function updateLocation(updatedLocation, db = connection) {
  return db('locations').where('id', updatedLocation.id).update({
    name: updatedLocation.name,
    description: updatedLocation.description,
  })
}

// EVENTS

function getEventsByDay(day, db = connection) {
  return db('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where('day', day)
    .select(
      'events.id',
      'events.day',
      'events.time',
      'events.name as eventName',
      'events.description',
      'locations.name as locationName'
    )
}

function addNewEvent(event, db = connection) {
  return db('events').insert(event)
}

function deleteEvent(id, db = connection) {
  return db('events').where('id', id).delete()
}

function getEventById(id, db = connection) {
  return db('events')
    .where('id', id)
    .select(
      `id`,
      `location_id as locationId`,
      'day',
      'time',
      'name',
      'description'
    )
}

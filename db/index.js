// TODO: Remove these
const events = require('./data/events.json')
const locations = require('./data/locations.json')

module.exports = {
  getEventsByDay,
  getAllLocations,
  updateLocation,
  getLocationById,
  addNewEvent,
  getEventById,
  updateEvent
}

function getEventsByDay (day) {
  const dayEvents = events
    .filter(event => event.day === day)
    .map(event => {
      return {
        ...event,
        icon: getEventIconPath(event.id),
        location: locations.find(loc => loc.id === event.location_id)
      }
    })
  return dayEvents
}

function getAllLocations () {
  return Promise.resolve(locations)
}

function updateLocation (location) {
  const changingLocation = locations.find(loc => loc.id === location.id)
  changingLocation.name = location.name
  changingLocation.description = location.description
}

function getLocationById (id) {
  return locations.find(loc => loc.id === id)
}

function addNewEvent (newEvent) {
  const { day, time, name, description } = newEvent
  const eventToAdd = {
    id: getNextId(events),
    location_id: Number(newEvent.locationId),
    day,
    time,
    name,
    description
  }
  events.push(eventToAdd)
}

function getEventById (id) {
  /* eslint-disable camelcase */
  const event = events.find(event => event.id === id)
  event.locationId = event.location_id
  delete event.location_id
  return event
}

function updateEvent (updatedEvent) {
  const changingEvent = events.find(event => event.id === updatedEvent.id)
  changingEvent.name = updatedEvent.name
  changingEvent.description = updatedEvent.description
  changingEvent.location_id = updatedEvent.locationId
  changingEvent.time = updatedEvent.time
  changingEvent.day = updatedEvent.day
}

/*
 * Helper functions
 ********************/

function getEventIconPath (id) {
  return `/images/eventIcons/event${(id % 6) + 1}.svg`
}

function getNextId (items) {
  function compare (a, b) {
    if (a.id > b.id) return -1
    if (b.id > a.id) return 1
    return 0
  }
  const sorted = items.sort(compare)
  const nextId = sorted[0].id + 1
  return nextId
}

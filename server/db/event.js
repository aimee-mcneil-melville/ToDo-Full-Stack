const { update } = require('./connection')
const connection = require('./connection')

module.exports = {
  getEvents,
  getEventById,
  addEvent,
  updateEvent
}

function getEvents (db = connection) {
  return db('events').select('id', 'garden_id as gardenId', 'title', 'date', 'description', 'volunteers_needed as volunteersNeeded')
}

function getEventById (id, db = connection) {
  return db('events').where('id', id).select().first()
}

function addEvent (newEvent, db = connection) {
  return db('events')
    .insert({
      garden_id: newEvent.gardenId,
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      volunteers_needed: newEvent.volunteersNeeded
    })
    .then(ids => getEventById(ids[0], db))
    .then(event => {
      return {
        ...event,
        gardenId: event.garden_id,
        volunteersNeeded: event.volunteers_needed
      }
    })
}

function updateEvent (updatedEvent, db = connection) {
  return db('events').where('id', updatedEvent.id)
    .update({
      title: updatedEvent.title,
      date: updatedEvent.date,
      description: updatedEvent.description,
      volunteers_needed: updatedEvent.volunteersNeeded
    })
    .then(() => getEventById(updatedEvent.id, db))
    .then(event => {
      // eslint-disable-next-line camelcase
      const { title, date, description, id, garden_id, volunteers_needed } = event
      return {
        id,
        gardenId: garden_id,
        title,
        date,
        description,
        volunteersNeeded: volunteers_needed
      }
    })
}

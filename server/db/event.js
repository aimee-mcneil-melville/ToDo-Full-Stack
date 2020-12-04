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
  return db('events').where('id', id).select('id', 'garden_id as gardenId', 'title', 'date', 'description', 'volunteers_needed as volunteersNeeded').first()
}

function addEvent (newEvent, db = connection) {
  const { gardenId, title, date, description, volunteersNeeded } = newEvent
  return db('events')
    .insert({
      garden_id: gardenId,
      volunteers_needed: volunteersNeeded,
      title,
      date,
      description
    })
    .then((ids) => getEventById(ids[0], db))
}

function updateEvent (updatedEvent, db = connection) {
  const { id, title, date, description, volunteersNeeded } = updatedEvent
  return db('events').where('id', id)
    .update({
      volunteers_needed: volunteersNeeded,
      title,
      date,
      description
    })
    .then(() => getEventById(id, db))
}

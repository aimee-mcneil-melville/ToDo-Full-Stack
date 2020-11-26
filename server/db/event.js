const connection = require('./connection')

module.exports = {
  getEvents
}

function getEvents (newEvent, db = connection) {
    return db('events')
        .insert(newEvent)
}


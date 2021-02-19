const connection = require('./connection')

module.exports = {
  addVolunteer,
  deleteVolunteer,
  getVolunteer
}

function addVolunteer (info, db = connection) {
  const { userId, eventId } = info
  return db('eventVolunteers')
    .insert({
      user_id: userId,
      event_id: eventId
    })
}

function deleteVolunteer (info, db = connection) {
  const { userId, eventId } = info
  return db('eventVolunteers')
    .where('user_id', userId)
    .where('event_id', eventId)
    .delete()
}

function getVolunteer (db = connection) {
  return db('eventVolunteers').select()
}

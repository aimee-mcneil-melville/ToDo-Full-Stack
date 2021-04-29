const connection = require('./connection')

module.exports = {
  addVolunteer,
  deleteVolunteer
}

function addVolunteer (registration, db = connection) {
  const { userId, eventId } = registration
  return db('eventVolunteers')
    .insert({
      user_id: userId,
      event_id: eventId
    })
}

function deleteVolunteer (registration, db = connection) {
  const { userId, eventId } = registration
  return db('eventVolunteers')
    .where('user_id', userId)
    .where('event_id', eventId)
    .delete()
}

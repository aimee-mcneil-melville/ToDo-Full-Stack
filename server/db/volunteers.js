const connection = require('./connection')

module.exports = {
  addVolunteer,
  deleteVolunteer,
  attend,
  addExtraVolunteer
}

function addVolunteer(registration, db = connection) {
  const { userId, eventId } = registration
  return db('eventVolunteers')
    .insert({
      user_id: userId,
      event_id: eventId
    })
}

function deleteVolunteer(registration, db = connection) {
  const { userId, eventId } = registration
  return db('eventVolunteers')
    .where('user_id', userId)
    .where('event_id', eventId)
    .delete()
}

function attend(eventData, db = connection) {
  const { isAttended, userId, eventId } = eventData
  return db('eventVolunteers')
    .where('user_id', userId)
    .where('event_id', eventId)
    .update({
      attended: isAttended
    })
}

function addExtraVolunteer(added, db = connection) {
  const { eventId, firstName, lastName } = added
  return db('extraVolunteers')
    .insert({
      event_id: eventId,
      first_name: firstName,
      last_name: lastName
    })
}

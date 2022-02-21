const connection = require('./connection')

module.exports = {
  addVolunteer,
  deleteVolunteer,
  addExtraVolunteer,
  setVolunteerAttendance,
}

function addVolunteer(registration, db = connection) {
  const { userId, eventId } = registration
  return db('event_volunteers').insert({
    user_id: userId,
    event_id: eventId,
  })
}

function deleteVolunteer(registration, db = connection) {
  const { userId, eventId } = registration
  return db('event_volunteers')
    .where({ user_id: userId, event_id: eventId })
    .delete()
}

function setVolunteerAttendance(eventData, db = connection) {
  const { hasAttended, userId, eventId } = eventData
  return db('event_volunteers')
    .where({ user_id: userId, event_id: eventId })
    .update({ attended: hasAttended })
}

function addExtraVolunteer(added, db = connection) {
  const { eventId, firstName, lastName } = added
  return db('extra_volunteers').insert({
    event_id: eventId,
    first_name: firstName,
    last_name: lastName,
  })
}

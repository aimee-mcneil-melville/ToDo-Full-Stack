const connection = require('./connection')

module.exports = {
  getEventById,
  addEvent,
  updateEvent,
  cancelEvent,
}

function getEventById(id, db = connection) {
  return db('events')
    .leftJoin('event_volunteers', 'event_volunteers.event_id', 'events.id')
    .leftJoin('users', 'event_volunteers.user_id', 'users.id')
    .leftJoin('gardens', 'events.garden_id', 'gardens.id')
    .leftJoin('extra_volunteers', 'events.id', 'extra_volunteers.event_id')
    .select(
      'name',
      'address',
      'attended',
      'events.id as id',
      'events.garden_id as gardenId',
      'title',
      'events.status',
      'date',
      'events.description',
      'volunteers_needed as volunteersNeeded',
      'user_id as userId',
      'users.first_name',
      'users.last_name',
      'extra_volunteers.first_name as extraVolFirstName',
      'extra_volunteers.last_name as extraVolLastName',
      'extra_volunteers.id as extraVolId',
      'lat',
      'lon'
    )
    .where('events.id', id)
    .then((result) => {
      const event = result[0]
      return {
        id: event.id,
        gardenId: event.gardenId,
        gardenName: event.name,
        gardenAddress: event.address,
        volunteersNeeded: event.volunteersNeeded,
        title: event.title,
        status: event.status,
        date: event.date,
        description: event.description,
        lat: event.lat,
        lon: event.lon,
        volunteers: !result.some((evts) => evts.userId)
          ? []
          : result.reduce((acc, cur) => {
              const personIncluded = acc.some((person) => {
                return person.userId === cur.userId
              })
              if (!personIncluded) {
                acc.push({
                  userId: cur.userId,
                  firstName: cur.first_name,
                  lastName: cur.last_name,
                  attended: result.find((evt) => evt.userId === cur.userId)
                    .attended
                    ? result.find((evt) => evt.userId === cur.userId).attended
                    : false,
                })
              }
              return acc
            }, []),
        extraVolunteers: !result.some((evts) => evts.extraVolId)
          ? []
          : result.reduce((acc, cur) => {
              const personIncluded = acc.some((person) => {
                return person.extraVolId === cur.extraVolId
              })
              if (!personIncluded) {
                acc.push({
                  extraVolId: cur.extraVolId,
                  firstName: cur.extraVolFirstName,
                  lastName: cur.extraVolLastName,
                })
              }
              return acc
            }, []),
      }
    })
}

function addEvent(newEvent, db = connection) {
  const { gardenId, title, date, description, volunteersNeeded } = newEvent
  return db('events')
    .insert({
      garden_id: gardenId,
      volunteers_needed: volunteersNeeded,
      title,
      date,
      description,
      status: 'Active',
    })
    .then((ids) => getEventById(ids[0], db))
}

function updateEvent(updatedEvent, db = connection) {
  const { id, title, date, description, volunteersNeeded, status } =
    updatedEvent
  return db('events')
    .where('id', id)
    .update({
      volunteers_needed: volunteersNeeded,
      title,
      date,
      description,
      status,
    })
    .then(() => getEventById(id, db))
}

function cancelEvent(id, db = connection) {
  return db('events')
    .where('id', id)
    .update({
      status: 'Cancelled',
    })
    .then(() => getEventById(id, db))
}

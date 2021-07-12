const connection = require('./connection')

module.exports = {
  getEventById,
  addEvent,
  updateEvent
}

function getEventById (id, db = connection) {
  return db('events')
    .leftJoin('eventVolunteers', 'eventVolunteers.event_id', 'events.id')
    .leftJoin('users', 'eventVolunteers.user_id', 'users.id')
    .leftJoin('gardens', 'events.garden_id', 'gardens.id')
    .leftJoin('extraVolunteers', 'events.id', 'extraVolunteers.event_id')
    .select('name', 'address', 'attended', 'events.id as id', 'events.garden_id as gardenId',
      'title', 'date', 'events.description', 'volunteers_needed as volunteersNeeded',
      'user_id as userId', 'username', 'users.first_name', 'users.last_name',
      'extraVolunteers.first_name as extraVolFirstName', 'extraVolunteers.last_name as extraVolLastName',
      'extraVolunteers.id as extraVolId', 'lat', 'lon')
    .where('events.id', id)
    .then(result => {
      const event = result[0]
      return {
        id: event.id,
        gardenId: event.gardenId,
        gardenName: event.name,
        gardenAddress: event.address,
        volunteersNeeded: event.volunteersNeeded,
        title: event.title,
        date: event.date,
        description: event.description,
        lat: event.lat,
        lon: event.lon,
        volunteers: !result.some(evts => evts.userId) ? [] : result.reduce((acc, cur) => {
          const personIncluded = acc.some((person) => {
            return person.userId === cur.userId
          })
          if (!personIncluded) {
            acc.push({
              userId: cur.userId,
              username: cur.username,
              firstName: cur.first_name,
              lastName: cur.last_name,
              attended: result.find(evt => evt.userId === cur.userId).attended ? result.find(evt => evt.userId === cur.userId).attended : false
            })
          }
          console.log(event.lat)
          return acc
        }, []),
        extraVolunteers: !result.some(evts => evts.extraVolId) ? [] : result.reduce((acc, cur) => {
          const personIncluded = acc.some((person) => {
            return person.extraVolId === cur.extraVolId
          })
          if (!personIncluded) {
            acc.push({
              extraVolId: cur.extraVolId,
              firstName: cur.extraVolFirstName,
              lastName: cur.extraVolLastName
            })
          }
          return acc
        }, [])
      }
    })
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

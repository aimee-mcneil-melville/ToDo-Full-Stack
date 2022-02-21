const connection = require('./connection')

module.exports = {
  getGardens,
  getGardenById,
  addGarden,
}

function getGardens(db = connection) {
  return db('gardens').select()
}

function addGarden(newGarden, db = connection) {
  return db('gardens')
    .insert(newGarden)
    .then((ids) => getGardenById(ids[0], db))
}

// Will be changing format of user table
function getGardenById(id, db = connection) {
  return db('gardens')
    .where('gardens.id', id)
    .leftJoin('events', 'gardens.id', 'events.garden_id')
    .leftJoin('event_volunteers', 'event_volunteers.event_id', 'events.id')
    .leftJoin('users', 'event_volunteers.user_id', 'users.id')
    .select(
      'gardens.description as description',
      'gardens.id as id',
      'name',
      'address',
      'lat',
      'lon',
      'url',
      'events.description as eventDescription',
      'events.id as eventId',
      'events.status as status',
      'title',
      'date',
      'volunteers_needed as volunteersNeeded',
      'users.id as userId'
    )
    .then((result) => {
      const garden = result[0]
      return {
        id: garden.id,
        name: garden.name,
        address: garden.address,
        description: garden.description,
        lat: garden.lat,
        lon: garden.lon,
        url: garden.url,
        events: !garden.eventId
          ? []
          : result.map((event) => {
              return {
                id: event.eventId,
                volunteersNeeded: event.volunteersNeeded,
                title: event.title,
                date: event.date,
                description: event.eventDescription,
                status: event.status,
                volunteer: {
                  userId: event.userId,
                },
              }
            }),
      }
    })
    .then((garden) => ({
      ...garden,
      events: extractVolunteers(garden.events),
    }))
}

function extractVolunteers(events) {
  return events
    .reduce(
      (acc, event) =>
        acc.some((e) => e.id === event.id)
          ? acc.map((e) =>
              e.id === event.id
                ? { ...e, volunteers: [...e.volunteers, event.volunteer] }
                : e
            )
          : [...acc, { ...event, volunteers: [event.volunteer] }],
      []
    )
    .map(
      ({
        id,
        volunteersNeeded,
        status,
        title,
        date,
        description,
        volunteers,
      }) => ({
        id,
        volunteersNeeded,
        title,
        status,
        date,
        description,
        volunteers: volunteers.filter((v) => v.userId),
      })
    )
}

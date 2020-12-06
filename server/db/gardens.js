const connection = require('./connection')

module.exports = {
  getGardens,
  getGardenById
}

function getGardens (db = connection) {
  return db('gardens').select()
}

function getGardenById (id, db = connection) {
  return db('gardens')
    .where('gardens.id', id)
    .leftJoin('events', 'gardens.id', 'events.garden_id')
    .select('gardens.description as description', 'gardens.id as id', 'name', 'address', 'lat', 'lon', 'url',
      'events.description as eventDescription', 'events.id as eventId', 'title', 'date', 'volunteers_needed as volunteersNeeded')
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
        events: !garden.eventId ? [] : result.map((event) => {
          return {
            id: event.eventId,
            volunteersNeeded: event.volunteersNeeded,
            title: event.title,
            datetime: event.date,
            description: event.eventDescription
          }
        })

      }
    })
}

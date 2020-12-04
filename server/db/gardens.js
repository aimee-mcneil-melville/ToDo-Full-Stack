const connection = require('./connection')

module.exports = {
  getGardens,
  getGardenById
}

function getGardens (db = connection) {
  return db('gardens').select()
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
      throw err
    })
}

function getGardenById (id, db = connection) {
  return db('gardens')
    .where('gardens.id', id)
    .leftJoin('events', 'gardens.id', 'events.garden_id')
    .select('gardens.description as description', 'gardens.id as id', 'name', 'address', 'lat', 'lon', 'url',
      'events.description as eventDescription', 'events.id as eventId', 'title', 'date', 'volunteers_needed as volunteersNeeded')
    .then(result => {
      return {
        id: result[0].id,
        name: result[0].name,
        address: result[0].address,
        description: result[0].description,
        lat: result[0].lat,
        lon: result[0].lon,
        url: result[0].url,
        events: !result[0].eventId ? [] : result.map(item => {
          return {
            id: item.eventId,
            volunteersNeeded: item.volunteersNeeded,
            title: item.title,
            datetime: item.date,
            description: item.eventDescription
          }
        })

      }
    })
}

import requestor from './consume'

export function getEvents (gardenId, consume = requestor) {
  return consume(`/gardens/${gardenId}`)
    .then(res => {
      return res.body
    })
}

export function addEvent (newEvent, consume = requestor) {
  return consume('/events', 'post', newEvent)
    .then(res => {
      return res.body
    })
}

export function getEventsById (id, consume = requestor) {
  return consume(`/events/${id}`)
    .then(res => {
      return res.body
    })
}

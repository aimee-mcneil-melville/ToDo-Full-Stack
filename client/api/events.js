import requestor from './consume'

export function getEvents (gardenId, consume = requestor) {
  return consume(`/gardens/${gardenId}`)
    .then(res => {
      return res.body
    })
}

export function editEvent (event, consume = requestor) {
  return consume(`/events/${event.id}/edit`, 'patch', event)
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

export function getEventById (id, consume = requestor) {
  return consume(`/events/${id}/edit`)
    .then(res => {
      return res.body
    })
}

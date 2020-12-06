import requestor from './consume'

export function getEventById (id, consume = requestor) {
  return consume(`/events/${id}`)
    .then(res => {
      return res.body
    })
}

export function postEvent (newEvent, consume = requestor) {
  return consume('/events', 'post', newEvent)
    .then(res => {
      return res.body
    })
}

export function patchEvent (event, consume = requestor) {
  return consume(`/events/${event.id}`, 'patch', event)
    .then(res => {
      return res.body
    })
}

import requestor from './consume'

export function getEvents (gardenId, consume = requestor) {
  return consume(`/gardens/${gardenId}`)
    .then(res => {
      return res.body
    })
}

export function addEvent (newEvent, consume = requestor) {
  return consume('/api/v1/events/new', 'post', newEvent)
    .then(res => {
      return res.body
    })
}

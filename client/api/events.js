import requestor from './consume'

export function getEvents (gardenId, consume = requestor) {
  return consume(`/gardens/${gardenId}`)
    .then(res => {
      return res.body
    })
}

export function addEvent (gardenId, newEvent, consume = requestor) {
  return consume('/api/v1/events/new', 'post', {
    gardenId: gardenId,
    title: newEvent.title,
    dateTime: newEvent.dateTime,
    volunteersNeeded: newEvent.volunteersNeeded,
    description: newEvent.description
  })
}

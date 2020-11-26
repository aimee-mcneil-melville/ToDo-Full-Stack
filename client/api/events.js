export function getEvents (gardenId, consume = requestor) {
  return consume(`/gardens/${gardenId}`)
    .then(res => {
      return res.body
    })
}

export function addEvent (gardenId, newEvent, consume = requestor) {
  return consume
    .post('/api/v1/events/new')
    .send({
      gardenId: gardenId,
      title: newEvent.state.title,
      dateTime: newEvent.state.dateTime,
      volunteersNeeded: newEvent.state.volunteersNeeded,
      description: newEvent.state.description
    })
}

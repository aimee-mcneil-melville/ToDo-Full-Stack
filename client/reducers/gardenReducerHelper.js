export function updateVolCount(garden, eventId) {
  const updatedEvents = garden.events.map((event) => {
    if (event.id === eventId) {
      if (event.isVolunteer === false) {
        event.totalVolunteers += 1
        event.isVolunteer = true
      } else {
        event.totalVolunteers -= 1
        event.isVolunteer = false
      }
    }
    return event
  })

  const newGarden = {
    ...garden,
    events: updatedEvents,
  }
  return newGarden
}

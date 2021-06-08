const eventDays = ['friday', 'saturday', 'sunday']

function capitalise (name) {
  return name[0].toUpperCase() + name.substring(1)
}

function validateDay (day, days = eventDays) {
  // Use the first day as the default value if the day argument isn't valid
  if (typeof day !== 'string') return days[0]
  if (!days.includes(day)) return days[0]

  return day.toLowerCase()
}

function getEventIconPath (eventId) {
  return `/images/eventIcons/event${(eventId % 6) + 1}.svg`
}

function getNextId (items) {
  function compare (a, b) {
    if (a.id > b.id) return -1
    if (b.id > a.id) return 1
    return 0
  }
  const sorted = items.sort(compare)
  const nextId = sorted[0].id + 1
  return nextId
}

module.exports = {
  eventDays,
  capitalise,
  validateDay,
  getEventIconPath,
  getNextId
}

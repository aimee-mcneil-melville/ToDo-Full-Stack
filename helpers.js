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

module.exports = {
  eventDays,
  capitalise,
  validateDay
}

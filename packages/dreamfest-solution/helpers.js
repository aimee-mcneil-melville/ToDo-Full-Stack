const eventDays = ['friday', 'saturday', 'sunday']

module.exports = {
  eventDays,
  capitalise,
  validateDay,
}

/*
 * We work with the days in all lowercase (above).
 * This function helps make them look nice for the user.
 */
function capitalise(name) {
  if (typeof name !== 'string' || name === '') {
    return ''
  } else {
    return name[0].toUpperCase() + name.substring(1)
  }
}

/*
 * This helps us always use a valid day, even
 * if the user puts an invalid one in the URL.
 */
function validateDay(day, days = eventDays) {
  // Throw an error if eventDays isn't an array of strings
  if (!Array.isArray(days)) {
    throw new Error('days is not an array of strings')
  }
  days.forEach((day) => {
    if (typeof day !== 'string') {
      throw new Error('days is not an array of strings')
    }
  })

  // Use the first day as the default value if the day argument isn't valid
  if (typeof day !== 'string') return days[0]
  if (!days.includes(day)) return days[0]
  return day.toLowerCase()
}

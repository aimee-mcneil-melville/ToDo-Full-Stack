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
  return name[0].toUpperCase() + name.substring(1)
}

/*
 * This helps us always use a valid day, even
 * if the user puts an invalid one in the URL.
 */
function validateDay(day, days = eventDays) {
  // Use the first day as the default value if the day argument isn't valid
  if (typeof day !== 'string') return days[0]
  if (!days.includes(day)) return days[0]
  return day
}

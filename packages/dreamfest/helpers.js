const eventDays = ['friday', 'saturday', 'sunday']

module.exports = {
  eventDays,
  capitalise,
  validateDay,
}

/**
 * Takes a string and capitalises the first letter.
 *
 * e.g. capitalise('tangle stage') => returns 'Tangle stage'
 * @param {string} name
 * @returns string
 */
function capitalise(name) {
  return name[0].toUpperCase() + name.substring(1)
}

/**
 * Ensures that @param day is a string and is a valid Event day
 * The default valid event days are: friday, saturday, and sunday
 *
 * If the input day is not valid, use the first valid day instead
 * @param {string} day
 * @param {string[]} days
 * @returns string
 */
function validateDay(day, days = eventDays) {
  // Use the first day as the default value if the day argument isn't valid
  if (typeof day !== 'string') return days[0]
  if (!days.includes(day)) return days[0]
  return day
}

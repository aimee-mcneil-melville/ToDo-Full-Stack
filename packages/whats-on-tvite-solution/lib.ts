// Import the schedule file.
import schedule from './schedule.ts'

// Import the show type from the models file.
import { Show } from './models/show.ts'

// Complete the getTime function.
export function getTime(show: Show) {
  return show.time
}

// Complete the getName function.
export function getName(show: Show) {
  return show.name
}

// Complete the getShowTimes function, returning an array of show times.
export function getShowTimes() {
  return schedule.map((show) => show.time)
}

// Complete the getShowNames function, returning an array of show names.
export function getShowNames() {
  return schedule.map((show) => show.name)
}

// Complete the getShowByTimeslot function, returning a show based on the timeslot or undefined if not found.
export function getShowByTimeslot(timeslot: string): Show | undefined {
  return schedule.find((show) => show.time === timeslot)
}

// =========
// Stretch!
// =========

// Complete the getNextShowByTimeslot function, returning a string based on the timeslot or undefined if not found.
export function getNextShowByTimeslot(timeslot: string): string | undefined {
  const currentIndex = schedule.findIndex((show) => show.time === timeslot)
  return currentIndex + 1 < schedule.length && currentIndex !== -1
    ? schedule[currentIndex + 1].name
    : undefined
}

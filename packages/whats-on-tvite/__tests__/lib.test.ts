import { vitest, describe, it, expect } from 'vitest'
// Import the functions from lib.ts
import {
  getTime,
  getName,
  getShowTimes,
  getShowNames,
  getShowByTimeslot,
  getNextShowByTimeslot,
} from '../lib'
import { Show } from '../models/show'

// Mock the schedule data for testing
vitest.mock('../schedule.ts', () => {
  return {
    default: [
      {
        time: 'Test Time 1',
        name: 'Test Show 1',
        description: 'Test Description 1',
      },
      {
        time: 'Test Time 2',
        name: 'Test Show 2',
        description: 'Test Description 2',
      },
    ],
  }
})

describe('lib functions', () => {
  const testShow: Show = {
    time: 'Test Time 1',
    name: 'Test Show 1',
    description: 'Test Description 1',
  }

  it('getTime returns the correct time', () => {
    expect(getTime(testShow)).toBe('Test Time 1')
  })

  it('getName returns the correct name', () => {
    expect(getName(testShow)).toBe('Test Show 1')
  })

  it('getShowTimes returns the correct array of show times', () => {
    expect(getShowTimes()).toEqual(['Test Time 1', 'Test Time 2'])
  })

  it('getShowNames returns the correct array of show names', () => {
    expect(getShowNames()).toEqual(['Test Show 1', 'Test Show 2'])
  })

  it('getShowByTimeslot returns the correct show based on timeslot', () => {
    expect(getShowByTimeslot('Test Time 1')).toEqual(testShow)
  })

  it('getShowByTimeslot returns undefined if a show is not found', () => {
    expect(getShowByTimeslot('Nonexistent Time')).toEqual(undefined)
  })

  it('getNextShowByTimeslot returns the correct next show name', () => {
    expect(getNextShowByTimeslot('Test Time 1')).toBe('Test Show 2')
  })

  it('getNextShowByTimeslot returns undefined if a show is not found', () => {
    expect(getNextShowByTimeslot('Nonexistent Time')).toEqual(undefined)
  })
})

import { describe, beforeEach, beforeAll, it, expect } from 'vitest'
import { connection, getEventsForDay } from '../index.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('schedule', () => {
  it('has a bunch of events', async () => {
    const data = await getEventsForDay('friday')
    expect(data).toMatchInlineSnapshot(`
      [
        {
          "day": "friday",
          "description": "This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!",
          "eventName": "Slushie Apocalypse I",
          "id": 1,
          "locationId": 1,
          "locationName": "TangleStage",
          "location_id": 1,
          "name": "TangleStage",
          "time": "2pm - 3pm",
        },
        {
          "day": "friday",
          "description": "This event will be taking place at the Yella Yurt. Come see what marvels our championship builders have built over the past 7 days!",
          "eventName": "LEGO Builder Championships",
          "id": 2,
          "locationId": 2,
          "locationName": "Yella Yurt",
          "location_id": 2,
          "name": "Yella Yurt",
          "time": "6pm - 7pm",
        },
      ]
    `)
  })
})

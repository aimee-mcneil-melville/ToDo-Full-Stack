import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../server'
import * as db from '../db/index.ts'

vi.mock('../db/index.ts')

describe('Schedule API', () => {
  it('responds with a list of events for friday', async () => {
    vi.mocked(db.getEventsForDay).mockImplementation(async (day: string) => {
      return [
        {
          id: 1,
          location_id: 1,
          day: 'friday',
          time: '2pm - 3pm',
          name: 'TangleStage',
          description:
            'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
          locationId: 1,
          eventName: 'Slushie Apocalypse I',
          locationName: 'TangleStage',
        },
      ]
    })

    const res = await request(server).get('/api/v1/schedule/friday')
    expect(res.body).toMatchInlineSnapshot(`
      {
        "day": "friday",
        "events": [
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
        ],
      }
    `)
  })
})

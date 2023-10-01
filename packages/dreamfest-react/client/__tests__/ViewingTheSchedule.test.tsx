// @vitest-environment jsdom
import { setupApp } from './setup.tsx'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
})

describe('The Schedule', () => {
  it('shows some events', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/schedule/friday')
      .reply(200, {
        day: 'friday',
        events: [
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
          {
            id: 2,
            location_id: 2,
            day: 'friday',
            time: '6pm - 7pm',
            name: 'Yella Yurt',
            description:
              'This event will be taking place at the Yella Yurt. Come see what marvels our championship builders have built over the past 7 days!',
            locationId: 2,
            eventName: 'LEGO Builder Championships',
            locationName: 'Yella Yurt',
          },
        ],
      })

    const screen = setupApp('/schedule/friday')

    const heading = await screen.findByText('Slushie Apocalypse I')
    expect(heading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})

// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { setupApp } from './test-setup.js'
import nock from 'nock'

describe('gallery details', () => {
  it('renders the detail from an gallery', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/galleries/1')
      .reply(200, {
        id: 1,
        name: 'Gallery of Quirk & Whimsy',
        description:
          'Step into a world of whimsy at the Gallery of Quirk & Whimsy, where art takes on a life of its own. Our exhibitions will tickle your imagination and leave you grinning from ear to ear.',
      })

    const { ...screen } = setupApp('/galleries/1')
    const heading = await screen.findByRole('heading', {
      name: 'Gallery: Gallery of Quirk & Whimsy',
    })

    expect(heading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})

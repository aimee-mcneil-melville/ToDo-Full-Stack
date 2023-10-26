// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { setupApp } from './test-setup.js'
import nock from 'nock'

describe('Artwork details', () => {
  it('renders the detail from an artwork', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/artworks/1')
      .reply(200, {
        id: 1,
        name: 'Pancake Paradise',
        medium: 'Syrup and butter on a vinyl record',
        description:
          'A syrupy masterpiece where golden pancakes stack like skyscrapers amidst a buttery metropolis, spinning tunes of brunchtime delight.',
      })

    const { ...screen } = setupApp('/artworks/1')
    const heading = await screen.findByRole('heading', {
      name: 'Artwork: Pancake Paradise',
    })

    expect(heading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})

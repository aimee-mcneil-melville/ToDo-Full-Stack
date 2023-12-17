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

  it('renders a link to the gallery', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/artworks/1')
      .reply(200, {
        id: 1,
        name: 'Pancake Paradise',
        medium: 'Syrup and butter on a vinyl record',
        description:
          'A syrupy masterpiece where golden pancakes stack like skyscrapers amidst a buttery metropolis, spinning tunes of brunchtime delight.',
        gallery_id: 1,
        gallery_name: 'Gallery of Quirk & Whimsy',
        gallery_description:
          'Step into a world of whimsy at the Gallery of Quirk & Whimsy, where art takes on a life of its own. Our exhibitions will tickle your imagination and leave you grinning from ear to ear.',
      })

    const { user, ...screen } = setupApp('/artworks/1')
    const link = await screen.findByRole('link', {
      name: 'Gallery of Quirk & Whimsy',
    })

    expect(link).toBeVisible()
    expect(scope.isDone()).toBe(true)
    const scope2 = nock('http://localhost')
      .get('/api/v1/galleries/1')
      .reply(200, {
        id: 1,
        name: 'Gallery of Quirk & Whimsy',
        description:
          'Step into a world of whimsy at the Gallery of Quirk & Whimsy, where art takes on a life of its own. Our exhibitions will tickle your imagination and leave you grinning from ear to ear.',
        artworks: [],
      })

    await user.click(link)
    const heading = await screen.findByRole('heading', {
      name: 'Gallery: Gallery of Quirk & Whimsy',
    })
    expect(heading).toBeVisible()
    expect(scope2.isDone()).toBe(true)
  })
})

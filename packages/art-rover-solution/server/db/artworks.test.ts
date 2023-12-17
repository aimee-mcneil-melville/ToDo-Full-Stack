import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import connection from './connection.ts'
import * as artworks from './artworks.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('.all()', () => {
  it('returns all the artworks', async () => {
    const data = await artworks.all()
    expect(data).toHaveLength(12)
  })

  it('returns artworks in the expected shape', async () => {
    const data = await artworks.all()
    expect(data[0]).toMatchInlineSnapshot(`
      {
        "description": "A syrupy masterpiece where golden pancakes stack like skyscrapers amidst a buttery metropolis, spinning tunes of brunchtime delight.",
        "gallery_id": 1,
        "id": 1,
        "medium": "Syrup and butter on a vinyl record",
        "name": "Pancake Paradise",
      }
    `)
  })
})

describe('.byId(id)', () => {
  it('pulls out the right artwork', async () => {
    const data = await artworks.byId(3)
    expect(data).toMatchInlineSnapshot(`
      {
        "description": "A sparkling galaxy made of chewed gum wrappers, where planets of bubblegum pop and sugary stars light up the universe.",
        "gallery_description": "Welcome to The Wacky Brushstroke Wonderland, a place where imagination runs wild and artistic boundaries are non-existent. Our gallery is a playground for the eccentric and the whimsical.",
        "gallery_id": 3,
        "gallery_name": "The Wacky Brushstroke Wonderland",
        "id": 3,
        "medium": "Chewing gum wrappers and glitter on canvas",
        "name": "Bubblegum Galaxy",
      }
    `)
  })
})

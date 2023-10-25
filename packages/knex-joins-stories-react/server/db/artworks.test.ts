import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import connection from "./connection.ts";
import * as artworks from './artworks.ts';
import * as galleries from './galleries.ts'

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

  it ('returns artworks in the expected shape', async () => {
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
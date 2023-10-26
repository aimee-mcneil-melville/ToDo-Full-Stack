import { describe, it, expect, vi } from 'vitest'
import server from '../server.ts'
import request from 'supertest'
import * as db from '../db/artworks.ts'

vi.mock('../db/artworks.ts')

describe('GET /api/v1/artworks/1', () => {
  it('returns somthing', async () => {
    // ARRANGE
    vi.mocked(db.byId).mockImplementation(async () => {
      return {
        id: 1,
        name: 'Pancake Paradise',
        medium: 'Syrup and butter on a vinyl record',
        description:
          'A syrupy masterpiece where golden pancakes stack like skyscrapers amidst a buttery metropolis, spinning tunes of brunchtime delight.',
        gallery_description:
          'Welcome to The Wacky Brushstroke Wonderland, a place where imagination runs wild and artistic boundaries are non-existent. Our gallery is a playground for the eccentric and the whimsical.',
        gallery_id: 3,
        gallery_name: 'The Wacky Brushstroke Wonderland',
      }
    })

    // ACT
    const res = await request(server).get('/api/v1/artworks/1')

    // ASSERT
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      {
        "description": "A syrupy masterpiece where golden pancakes stack like skyscrapers amidst a buttery metropolis, spinning tunes of brunchtime delight.",
        "gallery_description": "Welcome to The Wacky Brushstroke Wonderland, a place where imagination runs wild and artistic boundaries are non-existent. Our gallery is a playground for the eccentric and the whimsical.",
        "gallery_id": 3,
        "gallery_name": "The Wacky Brushstroke Wonderland",
        "id": 1,
        "medium": "Syrup and butter on a vinyl record",
        "name": "Pancake Paradise",
      }
    `)
  })
})

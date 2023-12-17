import { describe, it, expect, vi } from 'vitest'
import server from '../server.ts'
import request from 'supertest'
import * as db from '../db/galleries.ts'

vi.mock('../db/galleries.ts')

describe('GET /api/v1/galleries/1', () => {
  it('returns somthing', async () => {
    // ARRANGE
    vi.mocked(db.byId).mockImplementation(async () => {
      return {
        artworks: [
          {
            description:
              'A sparkling galaxy made of chewed gum wrappers, where planets of bubblegum pop and sugary stars light up the universe.',
            id: 3,
            medium: 'Chewing gum wrappers and glitter on canvas',
            name: 'Bubblegum Galaxy',
          },
          {
            description:
              'A groovy arrangement of psychedelic popsicles sprouting vibrant flowers, spreading summer vibes and sweet sensations.',
            id: 7,
            medium: 'Popsicle sticks and acrylic paint',
            name: 'Flower Power Popsicles',
          },
          {
            description:
              'A whimsical dance of banana peels and twine on a giant banana leaf stage, showcasing the graceful beauty of fruit in motion.',
            id: 11,
            medium: 'Banana peels and twine on a banana leaf',
            name: 'Banana Bonanza Ballet',
          },
        ],
        description:
          'Welcome to The Wacky Brushstroke Wonderland, a place where imagination runs wild and artistic boundaries are non-existent. Our gallery is a playground for the eccentric and the whimsical.',
        id: 3,
        name: 'The Wacky Brushstroke Wonderland',
      }
    })

    // ACT
    const res = await request(server).get('/api/v1/galleries/1')

    // ASSERT
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      {
        "artworks": [
          {
            "description": "A sparkling galaxy made of chewed gum wrappers, where planets of bubblegum pop and sugary stars light up the universe.",
            "id": 3,
            "medium": "Chewing gum wrappers and glitter on canvas",
            "name": "Bubblegum Galaxy",
          },
          {
            "description": "A groovy arrangement of psychedelic popsicles sprouting vibrant flowers, spreading summer vibes and sweet sensations.",
            "id": 7,
            "medium": "Popsicle sticks and acrylic paint",
            "name": "Flower Power Popsicles",
          },
          {
            "description": "A whimsical dance of banana peels and twine on a giant banana leaf stage, showcasing the graceful beauty of fruit in motion.",
            "id": 11,
            "medium": "Banana peels and twine on a banana leaf",
            "name": "Banana Bonanza Ballet",
          },
        ],
        "description": "Welcome to The Wacky Brushstroke Wonderland, a place where imagination runs wild and artistic boundaries are non-existent. Our gallery is a playground for the eccentric and the whimsical.",
        "id": 3,
        "name": "The Wacky Brushstroke Wonderland",
      }
    `)
  })
})

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import connection from './connection.ts'
import * as galleries from './galleries.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('.all()', () => {
  it('returns all the galleries', async () => {
    const data = await galleries.all()
    expect(data).toHaveLength(4)
  })

  it('returns galleries in the expected shape', async () => {
    const data = await galleries.all()
    expect(data[0]).toMatchInlineSnapshot(`
      {
        "description": "Step into a world of whimsy at the Gallery of Quirk & Whimsy, where art takes on a life of its own. Our exhibitions will tickle your imagination and leave you grinning from ear to ear.",
        "id": 1,
        "name": "Gallery of Quirk & Whimsy",
      }
    `)
  })
})

describe('.byId(id)', () => {
  it('pulls out the right gallery', async () => {
    const data = await galleries.byId(3)
    expect(data).toMatchInlineSnapshot(`
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

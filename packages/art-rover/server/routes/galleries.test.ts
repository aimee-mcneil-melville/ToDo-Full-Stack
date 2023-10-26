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
        id: 1,
        name: 'Gallery of Quirk & Whimsy',
        description:
          'Step into a world of whimsy at the Gallery of Quirk & Whimsy, where art takes on a life of its own. Our exhibitions will tickle your imagination and leave you grinning from ear to ear.',
      }
    })

    // ACT
    const res = await request(server).get('/api/v1/galleries/1')

    // ASSERT
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      {
        "description": "Step into a world of whimsy at the Gallery of Quirk & Whimsy, where art takes on a life of its own. Our exhibitions will tickle your imagination and leave you grinning from ear to ear.",
        "id": 1,
        "name": "Gallery of Quirk & Whimsy",
      }
    `)
  })
})

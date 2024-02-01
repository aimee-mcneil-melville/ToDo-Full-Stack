import { describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import * as fs from 'node:fs/promises'

import server from '../server.ts'

vi.mock('node:fs/promises')

const testData = {
  puppies: [
     {
      id: 1,
      name: 'Fido',
      owner: 'Fred',
      image: '/images/puppy1.jpg',
      breed: 'Labrador',
    },
    {
      id: 2,
      name: 'Coco',
      owner: 'Chloe',
      image: '/images/puppy2.jpg',
      breed: 'Labrador',
    },
    {
      id: 3,
      name: 'Magnum',
      owner: 'Michael',
      image: '/images/puppy3.jpg',
      breed: 'Rottweiler',
    },
  ],
}

describe('Listing all puppies', () => {
  it("lists the default puppies when there's no data file", async () => {
    vi.mocked(fs.readFile).mockImplementation(() => {
      // ERROR: this file does not exist
      const error = new Error()
      error.message = 'No such file'
      // @ts-expect-error error doesn't have property .code
      error.code = 'ENOENT'
      throw error
    })

    const res = await request(server).get('/api/v1/puppies')
    expect(res.statusCode).toBe(200)
    expect(res.body.puppies).toEqual([
      {
        breed: 'Labrador',
        id: 1,
        image: '/images/puppy1.jpg',
        name: 'Fido',
        owner: 'Fred',
      },
      {
        breed: 'Labrador',
        id: 2,
        image: '/images/puppy2.jpg',
        name: 'Coco',
        owner: 'Chloe',
      },
      {
        breed: 'Rottweiler',
        id: 3,
        image: '/images/puppy3.jpg',
        name: 'Magnum',
        owner: 'Michael',
      },
      {
        breed: 'Labrador',
        id: 4,
        image: '/images/puppy4.jpg',
        name: 'Sadie',
        owner: 'Sam',
      },
      {
        breed: 'Pug',
        id: 5,
        image: '/images/puppy5.jpg',
        name: 'Murphy',
        owner: 'Matthew',
      },
      {
        breed: 'Labrador',
        id: 6,
        image: '/images/puppy6.jpg',
        name: 'Bella',
        owner: 'Brianna',
      },
      {
        breed: 'Labrador',
        id: 7,
        image: '/images/puppy7.jpg',
        name: 'Rocky',
        owner: 'Ricky',
      },
    ])
  })

  it('lists the puppies in the data file if it exists', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () =>
      JSON.stringify(testData, null, 2)
    )

    const res = await request(server).get('/api/v1/puppies')
    expect(res.statusCode).toBe(200)
    expect(res.body.puppies).toEqual([
      {
      id: 1,
      name: 'Fido',
      owner: 'Fred',
      image: '/images/puppy1.jpg',
      breed: 'Labrador',
    },
    {
      id: 2,
      name: 'Coco',
      owner: 'Chloe',
      image: '/images/puppy2.jpg',
      breed: 'Labrador',
    },
    {
      id: 3,
      name: 'Magnum',
      owner: 'Michael',
      image: '/images/puppy3.jpg',
      breed: 'Rottweiler',
    },
    ])
  })
})

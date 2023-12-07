import { describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import * as fs from 'node:fs/promises'
import { existsSync } from 'node:fs'

import server from '../server.ts'

vi.mock('node:fs/promises')
vi.mock('node:fs')

const testData = {
  puppies: [
    {
      id: 1,
      name: 'Coco',
      owner: 'James',
      breed: 'Pug',
      image: '/images/dog1.jpg',
    },
    {
      id: 2,
      name: 'Fido',
      owner: 'Jimmy',
      breed: 'Dog',
      image: '/images/dog2.jpg',
    },
    {
      id: 3,
      name: 'Kermit',
      owner: 'Jerm',
      breed: 'Frog',
      image: '/images/dog3.jpg',
    },
  ],
}

describe('Listing all puppies', () => {
  it("lists the default puppies when there's no data file", async () => {
    vi.mocked(existsSync).mockImplementation(() => false)

    const res = await request(server).get('/api/v1/puppies')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "breed": "Labrador",
          "id": 1,
          "image": "/images/puppy1.jpg",
          "name": "Fido",
          "owner": "Fred",
        },
        {
          "breed": "Labrador",
          "id": 2,
          "image": "/images/puppy2.jpg",
          "name": "Coco",
          "owner": "Chloe",
        },
        {
          "breed": "Rottweiler",
          "id": 3,
          "image": "/images/puppy3.jpg",
          "name": "Magnum",
          "owner": "Michael",
        },
        {
          "breed": "Labrador",
          "id": 4,
          "image": "/images/puppy4.jpg",
          "name": "Sadie",
          "owner": "Sam",
        },
        {
          "breed": "Pug",
          "id": 5,
          "image": "/images/puppy5.jpg",
          "name": "Murphy",
          "owner": "Matthew",
        },
        {
          "breed": "Labrador",
          "id": 6,
          "image": "/images/puppy6.jpg",
          "name": "Bella",
          "owner": "Brianna",
        },
        {
          "breed": "Labrador",
          "id": 7,
          "image": "/images/puppy7.jpg",
          "name": "Rocky",
          "owner": "Ricky",
        },
      ]
    `)
    expect(existsSync).toHaveBeenCalledWith(expect.any(String))
  })

  it('lists the puppies in the data file if it exists', async () => {
    vi.mocked(existsSync).mockImplementation(() => true)
    vi.mocked(fs.readFile).mockImplementation(async () =>
      JSON.stringify(testData, null, 2)
    )

    const res = await request(server).get('/api/v1/puppies')
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "breed": "Pug",
          "id": 1,
          "image": "/images/dog1.jpg",
          "name": "Coco",
          "owner": "James",
        },
        {
          "breed": "Dog",
          "id": 2,
          "image": "/images/dog2.jpg",
          "name": "Fido",
          "owner": "Jimmy",
        },
        {
          "breed": "Frog",
          "id": 3,
          "image": "/images/dog3.jpg",
          "name": "Kermit",
          "owner": "Jerm",
        },
      ]
    `)
  })
})

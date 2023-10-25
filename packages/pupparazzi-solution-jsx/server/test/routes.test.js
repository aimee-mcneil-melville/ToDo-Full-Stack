import { describe, it, expect, vi } from 'vitest'

import request from 'supertest'
import { render } from '../../test-utils'

import matchers from '@testing-library/jest-dom/matchers'

import server from '../server'
import {
  getPuppyData as _getPuppyData,
  getPuppyById as _getPuppyById,
  editPuppy as _editPuppy,
  addNewPuppy as _addNewPuppy,
} from '../lib'

expect.extend(matchers)

vi.mock('../lib')

const mockPuppies = {
  puppies: [
    { id: 1, name: 'Fido', owner: 'Fred', image: '1.jpg', breed: 'Lab' },
    { id: 2, name: 'Coco', owner: 'Chloe', image: '2.jpg', breed: 'Pug' },
  ],
}

describe('GET /', () => {
  it('renders a list of puppies', () => {
    vi.mocked(_getPuppyData).mockImplementation((callback) => {
      callback(null, mockPuppies)
    })

    return request(server)
      .get('/')
      .expect(200)
      .then((res) => {
        const screen = render(res)
        const puppyLinks = screen.getAllByRole('link')
        expect(puppyLinks).toHaveLength(4)
      })
  })

  it('returns a 500 with the correct error message', () => {
    _getPuppyData.mockImplementation((callback) => {
      callback(new Error('test error message'))
    })

    return request(server)
      .get('/')
      .expect(500)
      .then((res) => {
        const screen = render(res)
        const msg = screen.getByText('test error message')

        expect(msg).toBeInTheDocument()
      })
  })
})

describe('GET /:id', () => {
  it('renders puppy details', () => {
    _getPuppyById.mockImplementation((id, callback) => {
      expect(id).toBe(2)
      callback(null, mockPuppies.puppies[1])
    })

    return request(server)
      .get('/2')
      .expect(200)
      .then((res) => {
        const screen = render(res)

        const img = screen.getByAltText('Coco')
        expect(img.src).toMatch(/\.jpg/)
        const heading = screen.getByRole('heading', { name: 'Coco' })
        expect(heading).toBeInTheDocument()
      })
  })

  it('returns a 404 if the id is not found', () => {
    _getPuppyById.mockImplementation((id, callback) => {
      const error = new Error('test not found error')
      error.code = 404
      callback(error)
    })

    return request(server)
      .get('/9999')
      .expect(404)
      .then((res) => {
        expect(res.text).toMatch('Not Found')
      })
  })

  it('returns a 500 with the correct error message', () => {
    vi.mocked(_getPuppyById).mockImplementation((id, callback) => {
      callback(new Error('test error message'))
    })

    // keep the error message from lib.js out of the test run

    return request(server)
      .get('/1')
      .expect(500)
      .then((res) => {
        expect(res.text).toMatch('test error message')
      })
  })
})

describe('POST /edit/:id', () => {
  it('receives puppy details and redirects to detail', () => {
    expect.assertions(6)

    _editPuppy.mockImplementation((pup, callback) => {
      const { id, name, owner, breed, image } = pup
      expect(id).toBe(2)
      expect(name).toBe('test name')
      expect(owner).toBe('test owner')
      expect(breed).toBe('test breed')
      expect(image).toBe('test.jpg')
      callback()
    })

    const updatedPuppy = {
      id: 2,
      name: 'test name',
      owner: 'test owner',
      breed: 'test breed',
      image: 'test.jpg',
    }

    return request(server)
      .post('/edit/2')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(302)
      .then((res) => {
        expect(res.header.location).toBe('/2')
      })
  })

  it('returns a 404 if the id is not found', () => {
    _editPuppy.mockImplementation((pup, callback) => {
      const error = new Error('test not found error')
      error.code = 404
      callback(error)
    })

    const updatedPuppy = {}

    return request(server)
      .post('/edit/9999')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(404)
      .then((res) => {
        expect(res.text).toMatch('Not Found')
      })
  })

  it('returns a 500 with the correct error message', () => {
    _editPuppy.mockImplementation((pup, callback) => {
      callback(new Error('test error message'))
    })

    // keep the error message from lib.js out of the test run
    const updatedPuppy = {}

    return request(server)
      .post('/edit/1')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(500)
      .then((res) => {
        expect(res.text).toMatch('test error message')
      })
  })
})

describe('POST /new', () => {
  it('receives the new puppy and redirects to detail', () => {
    expect.assertions(2)

    _addNewPuppy.mockImplementation((pup, callback) => {
      expect(pup.id).toBeUndefined()
      callback(null, 3)
    })

    const newPuppy = {
      name: 'test name',
      owner: 'test owner',
      breed: 'test breed',
      image: 'test.jpg',
    }

    return request(server)
      .post('/new')
      .send(newPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(302)
      .then((res) => {
        expect(res.header.location).toBe('/3')
      })
  })

  it('returns a 500 with the correct error message', () => {
    vi.mocked(_addNewPuppy).mockImplementation((pup, callback) => {
      callback(new Error('test error message'))
    })

    // keep the error message from lib.js out of the test run

    return request(server)
      .post('/new')
      .send({})
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })
      .expect(500)
      .then((res) => {
        expect(res.text).toMatch('test error message')
      })
  })
})

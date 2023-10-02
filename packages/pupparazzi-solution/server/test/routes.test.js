import { describe, it, expect, vi } from 'vitest'

import request from 'supertest'
import { render } from '../../test-utils'

import * as matchers from '@testing-library/jest-dom/matchers'

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
  it('renders a list of puppies', async () => {
    vi.mocked(_getPuppyData).mockImplementation(async () => {
      return mockPuppies
    })

    const res = await request(server).get('/')

    expect(res.statusCode).toBe(200)
    const screen = render(res)
    const puppyLinks = screen.getAllByRole('link')
    expect(puppyLinks).toHaveLength(4)
  })

  it('returns a 500 with the correct error message', async () => {
    _getPuppyData.mockImplementation(async () => {
      throw new Error('test error message')
    })

    const res = await request(server).get('/')
    expect(res.statusCode).toBe(500)
    const screen = render(res)
    const msg = screen.getByText(/test error message/)

    expect(msg).toBeInTheDocument()
  })
})

describe('GET /:id', () => {
  it('renders puppy details', async () => {
    _getPuppyById.mockImplementation(async (id) => {
      return mockPuppies.puppies[1]
    })

    const res = await request(server).get('/2')
    expect(res.statusCode).toBe(200)
    const screen = render(res)

    const img = screen.getByAltText('Coco')
    expect(img.src).toMatch(/\.jpg/)
    const heading = screen.getByRole('heading', { name: 'Coco' })
    expect(heading).toBeInTheDocument()
  })

  it('returns a 404 if the id is not found', async () => {
    _getPuppyById.mockImplementation(async () => {
      const error = new Error('test not found error')
      error.code = 404
      throw error
    })

    const res = await request(server).get('/9999')
    expect(res.statusCode).toBe(404)
    expect(res.text).toMatch('Not Found')
  })

  it('returns a 500 with the correct error message', async () => {
    vi.mocked(_getPuppyById).mockImplementation(async () => {
      throw new Error('test error message')
    })

    // keep the error message from lib.js out of the test run

    const res = await request(server).get('/1')
    expect(res.statusCode).toBe(500)

    expect(res.text).toMatch('test error message')
  })
})
describe('GET /edit/:id', () => {
  it('shows a form to edit a puppy', async () => {
    _getPuppyById.mockImplementation(async () => {
      return {
        id: 1,
        name: 'Fido',
        owner: 'Fred',
        image: '1.jpg',
        breed: 'Lab',
      }
    })
    const res = await request(server).get('/edit/1')
    const screen = render(res)
    expect(screen.getByLabelText('Name:')).toHaveValue('Fido')
    expect(screen.getByLabelText('Owner:')).toHaveValue('Fred')
    expect(screen.getByLabelText('Breed:')).toHaveValue('Lab')
  })

  it('shows a form to edit a puppy', async () => {
    _getPuppyById.mockImplementation(async () => {
      throw new Error('something wrong')
    })
    const res = await request(server).get('/edit/1')
    expect(res.statusCode).toBe(500)
    const screen = render(res)
    expect(screen.getByText(/something wrong/)).toBeVisible()
  })
})

describe('POST /edit/:id', () => {
  it('receives puppy details and redirects to detail', async () => {
    _editPuppy.mockImplementation(async () => {})

    const updatedPuppy = {
      id: 2,
      name: 'test name',
      owner: 'test owner',
      breed: 'test breed',
      image: 'test.jpg',
    }

    const res = await request(server)
      .post('/edit/2')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })

    expect(res.statusCode).toBe(302)
    expect(res.header.location).toBe('/2')
    expect(_editPuppy).toBeCalledWith({
      id: 2,
      name: 'test name',
      owner: 'test owner',
      breed: 'test breed',
      image: 'test.jpg',
    })
  })

  it('returns a 404 if the id is not found', async () => {
    _editPuppy.mockImplementation(async () => {
      const error = new Error('test not found error')
      error.code = 404
      throw error
    })

    const updatedPuppy = {}

    const res = await request(server)
      .post('/edit/9999')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })

    expect(res.statusCode).toBe(404)
    expect(res.text).toMatch('Not Found')
  })

  it('returns a 500 with the correct error message', async () => {
    _editPuppy.mockImplementation(async () => {
      throw new Error('test error message')
    })

    // keep the error message from lib.js out of the test run
    const updatedPuppy = {}

    const res = await request(server)
      .post('/edit/1')
      .send(updatedPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })

    expect(res.statusCode).toBe(500)
    expect(res.text).toMatch('test error message')
  })
})

describe('GET /new', () => {
  it('shows a form to create a puppy', async () => {
    const res = await request(server).get('/new')
    const screen = render(res)
    expect(screen.getByLabelText('Name:')).toBeVisible()
    expect(screen.getByLabelText('Owner:')).toBeVisible()
    expect(screen.getByLabelText('Breed:')).toBeVisible()
  })
})

describe('POST /new', () => {
  it('receives the new puppy and redirects to detail', async () => {
    _addNewPuppy.mockImplementation(async () => {
      return 3
    })

    const newPuppy = {
      name: 'test name',
      owner: 'test owner',
      breed: 'test breed',
      image: 'test.jpg',
    }

    const res = await request(server)
      .post('/new')
      .send(newPuppy)
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })

    expect(res.statusCode).toBe(302)
    expect(res.header.location).toBe('/3')
  })

  it('returns a 500 with the correct error message', async () => {
    vi.mocked(_addNewPuppy).mockImplementation(async (pup, callback) => {
      throw new Error('test error message')
    })

    // keep the error message from lib.js out of the test run

    const res = await request(server)
      .post('/new')
      .send({})
      .set({ 'Content-Type': 'application/x-www-form-urlencoded' })

    expect(res.statusCode).toBe(500)
    expect(res.text).toMatch('test error message')
  })
})

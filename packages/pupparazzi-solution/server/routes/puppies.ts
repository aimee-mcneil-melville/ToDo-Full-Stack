import express from 'express'
import * as store from '../store.ts'

const router = express.Router()

// list all the puppies
// GET /api/v1/puppies/
router.get('/', async (req, res, next) => {
  try {
    const puppies = await store.getAll()
    res.json(puppies)
  } catch (error) {
    next(error)
  }
})

// create a brand new puppy
router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    if (
      typeof data.name !== 'string' ||
      data.name === '' ||
      typeof data.owner !== 'string' ||
      data.owner === '' ||
      typeof data.breed !== 'string' ||
      data.breed == '' ||
      typeof data.image !== 'string' ||
      data.image === ''
    ) {
      res.sendStatus(422)
      // TODO: better error message
      return
    }
    const id = await store.create(data)
    const location = `/api/v1/puppies/${id}`
    res.status(201).setHeader('Location', location).json({ location, id })
  } catch (error) {
    next(error)
  }
})

// get a specific puppy
// GET /api/v1/puppies/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(404)
      return
    }

    const pup = await store.byId(id)
    if (pup == undefined) {
      res.status(404)
    }

    res.json(pup)
  } catch (error) {
    next(error)
  }
})

// deletes a specific puppy
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await store.deleteById(id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// update a specific puppy
router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await store.update(id, req.body)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

export default router

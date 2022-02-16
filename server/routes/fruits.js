const express = require('express')
// TODO: import checkJwt
const db = require('../db/fruits')

const router = express.Router()

module.exports = router

// A public endpoint that anyone can access
// GET /api/v1/fruits
router.get('/', async (req, res) => {
  try {
    const fruits = await db.getFruits()
    res.json({ fruits })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

// use checkJwt as middleware
// POST /api/v1/fruits
router.post('/', async (req, res) => {
  const { fruit } = req.body
  const auth0Id = req.user?.sub
  const newFruit = {
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }
  try {
    const fruits = await db.addFruit(newFruit)
    res.json({ fruits })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

// use checkJwt as middleware
// PUT /api/v1/fruits
router.put('/', async (req, res) => {
  const { fruit } = req.body
  const auth0Id = req.user?.sub
  const fruitToUpdate = {
    id: fruit.id,
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }
  try {
    const fruits = await db.updateFruit(fruitToUpdate, auth0Id)
    res.json({ fruits })
  } catch (err) {
    console.error(err)
    if (err.message === 'Unauthorized') {
      return res
        .status(403)
        .send('Unauthorized: Only the user who added the fruit may update it')
    }
    res.status(500).send(err.message)
  }
})

// use checkJwt as middleware
// DELETE /api/v1/fruits
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.user?.sub
  try {
    const fruits = await db.deleteFruit(id, auth0Id)
    res.json({ fruits })
  } catch (err) {
    console.error(err)
    if (err.message === 'Unauthorized') {
      return res
        .status(403)
        .send('Unauthorized: Only the user who added the fruit may delete it')
    }
    res.status(500).send(err.message)
  }
})

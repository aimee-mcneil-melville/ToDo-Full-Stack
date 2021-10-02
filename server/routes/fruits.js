const express = require('express')
// import checjJwt
const checkJwt = require('../auth0')
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

// use checkJwt as a middle
// POST /api/v1/fruits
router.post('/', checkJwt, async (req, res) => {
  const { fruit, auth0Id } = req.body
  const newFruit = {
    added_by_user: auth0Id,
    name: fruit.name,
    calories: fruit.calories
  }
  try {
    const fruits = await db.addFruit(newFruit)
    res.json({ fruits })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

// use checkJwt as a middle
// PUT /api/v1/fruits
router.put('/', checkJwt, async (req, res) => {
  const { fruit, auth0Id } = req.body
  const newFruit = {
    added_by_user: auth0Id,
    name: fruit.name,
    calories: fruit.calories
  }
  try {
    const fruits = await db.updateFruit(newFruit, auth0Id)
    res.json({ fruits })
  } catch (err) {
    console.error(err)
    if (err.message === 'Unauthorized') {
      return res.status(403).send(
        'Unauthorized: Only the user who added the fruit may update it'
      )
    }
    res.status(500).send(err.message)
  }
})

// use checkJwt as a middle
// DELETE /api/v1/fruits
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.body.auth0Id
  try {
    const fruits = await db.deleteFruit(id, auth0Id)
    res.json({ fruits })
  } catch (err) {
    console.error(err)
    if (err.message === 'Unauthorized') {
      return res.status(403).send(
        'Unauthorized: Only the user who added the fruit may delete it'
      )
    }
    res.status(500).send(err.message)
  }
})

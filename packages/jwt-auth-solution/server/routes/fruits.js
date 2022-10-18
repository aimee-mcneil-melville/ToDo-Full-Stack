const express = require('express')
const checkJwt = require('../auth0')

const db = require('../db/fruits')
const router = express.Router()

// A public endpoint that anyone can access
// GET /api/v1/fruits
router.get('/', (req, res) => {
  db.getFruits()
    .then((fruits) => res.json({ fruits }))
    .catch((err) => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

// TODO: use checkJwt as middleware
// POST /api/v1/fruits
router.post('/', checkJwt, (req, res) => {
  const { fruit } = req.body
  const auth0Id = req.auth?.sub
  const newFruit = {
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }

  db.addFruit(newFruit)
    .then(() => db.getFruits())
    .then((fruits) => res.json({ fruits }))
    .catch((err) => {
      console.error(err)
      res.status(500).send(err.message)
    })
})

// TODO: use checkJwt as middleware
// PUT /api/v1/fruits
router.put('/', checkJwt, (req, res) => {
  const { fruit } = req.body
  const auth0Id = req.auth?.sub
  const fruitToUpdate = {
    id: fruit.id,
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }

  db.userCanEdit(fruit.id, auth0Id)
    .then(() => db.updateFruit(fruitToUpdate))
    .then(() => db.getFruits())
    .then((fruits) => res.json({ fruits }))
    .catch((err) => {
      console.error(err)
      if (err.message === 'Unauthorized') {
        res
          .status(403)
          .send('Unauthorized: Only the user who added the fruit may update it')
      } else {
        res.status(500).send(err.message)
      }
    })
})

// TODO: use checkJwt as middleware
// DELETE /api/v1/fruits
router.delete('/:id', checkJwt, (req, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub

  db.userCanEdit(id, auth0Id)
    .then(() => db.deleteFruit(id))
    .then(() => db.getFruits())
    .then((fruits) => res.json({ fruits }))
    .catch((err) => {
      console.error(err)
      if (err.message === 'Unauthorized') {
        res
          .status(403)
          .send('Unauthorized: Only the user who added the fruit may update it')
      } else {
        res.status(500).send(err.message)
      }
    })
})

module.exports = router

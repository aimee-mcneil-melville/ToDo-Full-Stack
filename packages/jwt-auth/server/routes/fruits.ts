import express from 'express'
import Fruits from '../../client/components/Fruits'
// TODO: import checkJwt
import {Fruit, TypedRequestBody, PostFruitReq} from '../../types'

import {getFruits,addFruit,deleteFruit,updateFruit,userCanEdit} from '../db/fruits'

const router = express.Router()

// A public endpoint that anyone can access
// GET /api/v1/fruits
router.get('/', (req, res) => {
  getFruits()
    .then((fruits: Fruit[]) => res.json({ fruits }))
    .catch((err: Error) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

// TODO: use checkJwt as middleware
// POST /api/v1/fruits
router.post('/', (req: any, res) => {
  const { fruit } = req.body
  const auth0Id = req.auth?.sub
  const newFruit: Fruit = {
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  } 

  addFruit(newFruit)
    .then(() => getFruits())
    .then((fruits: Fruit[]) => res.json({ fruits }))
    .catch((err: Error) => {
      console.error(err)
      res.status(500).send('Something went wrong')
    })
})

// TODO: use checkJwt as middleware
// PUT /api/v1/fruits
router.put('/', (req: any, res) => {
  const { fruit } = req.body
  const auth0Id = req.auth?.sub
  const fruitToUpdate = {
    id: fruit.id,
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }

  userCanEdit(fruit.id, auth0Id)
    .then(() => updateFruit(fruitToUpdate))
    .then(() => getFruits())
    .then((fruits: Fruit[]) => res.json({ fruits }))
    .catch((err: Error) => {
      console.error(err)
      if (err.message === 'Unauthorized') {
        res
          .status(403)
          .send('Unauthorized: Only the user who added the fruit may update it')
      } else {
        res.status(500).send('Something went wrong')
      }
    })
})

// TODO: use checkJwt as middleware
// DELETE /api/v1/fruits
router.delete('/:id', (req: any, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub

  userCanEdit(id, auth0Id)
    .then(() => deleteFruit(id))
    .then(() => getFruits())
    .then((fruits) => res.json({ fruits }))
    .catch((err) => {
      console.error(err)
      if (err.message === 'Unauthorized') {
        res
          .status(403)
          .send('Unauthorized: Only the user who added the fruit may update it')
      } else {
        res.status(500).send('Something went wrong')
      }
    })
})

export default router

import express from 'express'

import * as db from '../db/products'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const products = await db.getAllProducts()

    res.json(products)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send('DATABASE ERROR: ' + error.message)
    }
  }
})

export default router

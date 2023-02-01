import { Router } from 'express'

import { getFruits } from '../db/fruits'

const router = Router()

router.get('/', (req, res) => {
  getFruits()
    .then((results) => {
      res.json({ fruits: results.map((fruit) => fruit.name) })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

export default router

import express from 'express'
import { getWidgets } from '../db/db'

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
  getWidgets()
    .then((widgets) => {
      res.json(widgets)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router

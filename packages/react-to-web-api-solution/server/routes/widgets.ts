import express, { Response } from 'express'
import { getWidgets } from '../db/db'
import { Widget } from '../../models/Widget'

const router = express.Router()

router.get('/', (req, res: Response<Widget[]>) => {
  getWidgets()
    .then((widgets) => {
      res.json(widgets)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

export default router

import express from 'express'
import { addWidget, getWidgets, delWidget } from '../db/db'

const router = express.Router()

router.get('/', (req, res) => {
  getWidgets()
    .then((widgets) => {
      res.json(widgets)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', (req, res) => {
  addWidget(req.body)
    .then(() => getWidgets())
    .then((widgets) => {
      res.json(widgets)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  delWidget(Number(id))
    .then(() => res.sendStatus(200))
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

export default router

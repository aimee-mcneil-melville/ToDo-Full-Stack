import express from 'express'
import { addWidget, getWidgets, delWidget, updateWidget } from '../db/db.ts'

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
  const { name, price, mfg, inStock, rating } = req.body
  addWidget({ name, price, mfg, inStock, rating })
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

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { name, price, mfg, inStock, rating } = req.body
  updateWidget(Number(id), { name, price, mfg, inStock, rating })
    .then(() => res.json({ id: Number(id), name, price, mfg, inStock, rating }))
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

export default router

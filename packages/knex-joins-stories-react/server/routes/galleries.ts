import express from 'express'
import * as db from '../db/galleries.ts'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await db.all()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try { 
    const id = Number(req.params.id)
    const data = await db.detailsById(id)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

export default router

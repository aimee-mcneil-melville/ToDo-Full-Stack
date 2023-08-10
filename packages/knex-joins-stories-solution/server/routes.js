import express from 'express'
import * as db from './db/index.js'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const wombles = await db.wombles()
    res.render('list', {
      wombles,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/wombles/:id', async (req, res, next) => {
  try {
    const womble = await db.getWomble(req.params.id)
    res.render('womble', { ...womble })
  } catch (e) {
    next(e)
  }
})

export default router

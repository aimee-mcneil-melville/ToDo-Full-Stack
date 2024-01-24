import express from 'express'
import { Welcome } from '../../models/welcome.ts'

const router = express.Router()

// GET /api/v1/welcome/
router.get('/', (req, res) => {
  try {
    res.json({ statement: 'Welcome to external APIs!' } as Welcome)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router

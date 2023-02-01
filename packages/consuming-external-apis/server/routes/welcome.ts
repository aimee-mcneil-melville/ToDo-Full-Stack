import express from 'express'

const router = express.Router()

// GET /api/v1/welcome/
router.get('/', (req, res) => {
  try {
    res.json({ statement: 'Welcome to external APIs!' })
  } catch (err) {
    res.status(500).send(err != null && (err as Error).message)
  }
})

export default router

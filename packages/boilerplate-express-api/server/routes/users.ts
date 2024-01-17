import { Router } from 'express'

import * as db from '../db/db.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await db.getUsers()
    res.json({ users: users })
  } catch (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const user = await db.getUser(id)
    res.json({ user: user })
  } catch (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  }
})

export default router

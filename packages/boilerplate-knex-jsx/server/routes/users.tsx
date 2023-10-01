import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'

import * as db from '../db/db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await db.getUsers()
    res.send(
      renderToStaticMarkup(
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )
    )
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
      res.status(500).send('DATABASE ERROR: ' + err.message)
    }
  }
})

export default router

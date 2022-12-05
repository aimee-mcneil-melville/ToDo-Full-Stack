import express from 'express'
import { applyAuthRoutes } from 'authenticare/server'

import { userExists, getUserByUsername, createUser } from '../db/users'

const router = express.Router()

applyAuthRoutes(router, {
  userExists,
  getUserByName: getUserByUsername,
  createUser,
})

export default router

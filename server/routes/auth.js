const express = require('express')
const { applyAuthRoutes } = require('authenticare/server')

const {
  userExists,
  getUserByName,
  createUser
} = require('../db/users')

const router = express.Router()

module.exports = router

applyAuthRoutes(router, {
  userExists,
  getUserByName,
  createUser
})

const express = require('express')
const { getUserRoles } = require('../auth0')

const db = require('../db/users')

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.json({ users })
      return null
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const roles = await getUserRoles(id)
    res.json({ roles })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'unable to retrieve user roles' })
  }
})

module.exports = router

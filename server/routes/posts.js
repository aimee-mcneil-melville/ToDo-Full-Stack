const express = require('express')
const log = require('../logger')
const db = require('../db/gardens')
// const { userHasAdminRole, checkJwt } = require('./auth')
// const { getUserById } = require('../db/users')

const router = express.Router()
module.exports = router

// const checkAdmin = jwtAuthz(['create:post', 'update:post', 'delete:post'], {
//   customScopeKey: 'permissions'
// })

router.get('/:gardenid', (req, res) => {
  db.getPostsByGardenId(Number(req.params.id))
    .then((posts) => {
      res.json({ posts })
      return null
    })
    .catch((err) => {
      log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve posts'
        }
      })
    })
})

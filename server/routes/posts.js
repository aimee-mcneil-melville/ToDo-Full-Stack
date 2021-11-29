const express = require('express')
const log = require('../logger')
const db = require('../db/posts')
// const { userHasAdminRole, checkJwt } = require('./auth')
// const { getUserById } = require('../db/users')

const router = express.Router()
module.exports = router

// const checkAdmin = jwtAuthz(['create:post', 'update:post', 'delete:post'], {
//   customScopeKey: 'permissions'
// })

router.get('/:gardenid', (req, res) => {
  console.log('GET /:gardenid called')
  db.getPostsByGardenId(Number(req.params.id))
    .then((posts) => {
      console.log('posts: ', posts)
      // res.json({ posts })
      res.status(201).json({ posts })
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

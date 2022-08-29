const express = require('express')

// eslint-disable-next-line no-unused-vars
const db = require('../db/db')

const router = express.Router()

router.get('/:postId/comments', (req, res) => {
  const postId = req.params.postId
  return db.getComments(postId).then((comments) => {
    res.json(comments)
  })
})

router.post('/:postId/comments', (req, res) => {
  const postId = req.params.postId
  const comment = req.body
  return db.addComment(postId, comment).then((comment) => {
    res.json(comment)
  })
})

router.get('/', (req, res) => {
  return db.getAllPosts().then((posts) => {
    res.json(posts)
  })
})

router.post('/', (req, res) => {
  const post = req.body
  return db.addPost(post).then((post) => {
    res.json(post)
  })
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const post = req.body
  return db.updatePost(id, post).then((post) => {
    res.json(post)
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return db.deletePost(id).then(() => {
    res.sendStatus(200)
  })
})

module.exports = router

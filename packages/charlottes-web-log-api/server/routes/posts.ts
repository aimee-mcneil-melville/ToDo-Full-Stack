import express from 'express'

// eslint-disable-next-line no-unused-vars
import {getComments, addComment, getAllPosts, addPost, updatePost, deletePost} from '../db/db'

const router = express.Router()

router.get('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)
  return getComments(postId).then((comments) => {
    res.json(comments)
  })
})

router.post('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)
  const comment = req.body
  return addComment(postId, comment).then((comment) => {
    res.json(comment)
  })
})

router.get('/', (req, res) => {
  return getAllPosts().then((posts) => {
    res.json(posts)
  })
})

router.post('/', (req, res) => {
  const post = req.body
  return addPost(post).then((post) => {
    res.json(post)
  })
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const post = req.body
  return updatePost(id, post).then((post) => {
    res.json(post)
  })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  return deletePost(id).then(() => {
    res.sendStatus(200)
  })
})

export default router

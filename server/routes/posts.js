const express = require('express')
const router = express.Router()

const db = require('../db/db')
const bodyParser = require('body-parser')

router.use(bodyParser.json())

router.get('/', (req, res) => {
  db.getPosts()
    .then(data => {
      res.json(data)
    })
})
// 
// router.post('/', (req, res) => {
//   const { title, paragraphs } = req.body
//   
//   const post = {
//     title,
//     paragraphs: JSON.stringify(paragraphs.split('\n')),
//     dateCreated: new Date(Date.now()).toISOString()
//   }
//   
//   db.addPost(post)
//     .then(addedPost => {
//       res.json(addedPost)
//     })
// })
// 
// router.put('/:id', (req, res) => {
//   const { title, paragraphs, id } = req.body
//   
//   const post = {
//     title,
//     paragraphs: JSON.stringify(paragraphs.split('\n'))
//   }
//   
//   db.updatePostById(id, post)
//     .then(updatedPost => {
//       res.json(updatedPost)
//     })
// })
// 
// router.delete('/:id', (req, res) => {
//   db.deletePostById(req.params.id)
//     .then(() => {
//       res.json({})
//     })
// })
// 
// // Comments
// 
// router.get('/:postId/comments', (req, res) => {
//   db.getCommentsByPostId(req.params.postId)
//     .then(data => {
//       res.json(data)
//     })
// })
// 
// router.post('/:postId/comments', (req, res) => {
//   const comment = {
//     comment: req.body.comment,
//     postId: req.params.postId,
//     datePosted: new Date(Date.now())
//   }
//   db.addComment(comment)
//     .then(data => {
//       res.json(data)
//     })
// })


module.exports = router
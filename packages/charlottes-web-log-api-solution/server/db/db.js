const config = require('./knexfile').development
// eslint-disable-next-line no-unused-vars
const connection = require('knex')(config)

function getAllPosts(db = connection) {
  return db('posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
  )
}

function getPost(id, db = connection) {
  return db('posts')
    .select('id', 'title', 'date_created as dateCreated', 'text')
    .where('id', id)
    .first()
}

// TODO: rather than making a second database call to fetch the newly-created
// (or newly-updated) record, a more efficient approach would be to reconstruct
// the record based on the details passed in, plus the id returned from the first
// database call
function addPost(post, db = connection) {
  return db('posts')
    .insert({ ...post, date_created: Date.now() })
    .then((ids) => {
      return getPost(ids[0])
    })
}

function updatePost(id, post, db = connection) {
  return db('posts')
    .update({ title: post.title, text: post.text })
    .where('id', id)
    .then(() => {
      return getPost(id)
    })
}

// TODO: when deleting a post, also delete its comments
function deletePost(id, db = connection) {
  return db('posts').delete().where('id', id)
}

function getComments(postId, db = connection) {
  return db('comments')
    .select('id', 'post_id as postId', 'date_posted as datePosted', 'comment')
    .where('post_id', postId)
}

function getComment(id, db = connection) {
  return db('comments')
    .select('id', 'post_id as postId', 'date_posted as datePosted', 'comment')
    .where('id', id)
    .first()
}

function addComment(postId, comment, db = connection) {
  return db('comments')
    .insert({
      post_id: postId,
      date_posted: Date.now(),
      comment: comment.comment,
    })
    .then((ids) => {
      return getComment(ids[0])
    })
}

function updateComment(id, comment, db = connection) {
  return db('comments')
    .update({
      comment: comment.comment,
    })
    .where('id', id)
    .then(() => {
      return getComment(id)
    })
}

function deleteComment(id, db = connection) {
  return db('comments').delete().where('id', id)
}

module.exports = {
  getAllPosts,
  addPost,
  deletePost,
  updatePost,
  getComments,
  addComment,
  updateComment,
  deleteComment,
}

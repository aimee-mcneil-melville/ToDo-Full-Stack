const connection = require('./connection')

module.exports = {
  getCommentsByPostId,
  postComment,
  deleteCommentById,
  deleteAllCommentsByPostId
}

function getCommentsByPostId (id, db = connection) {
  return db('comments')
    .where('post_id', id)
    .select()
}

function deleteAllCommentsByPostId (id, db = connection) {
  console.log('id', id)
  return db('comments')
    .where('post_id', id)
    .del()
}

function postComment (postId, comment, authorId, db = connection) {
  // takes post id, new comment, author id
  // post a new comment for a blog post
}

function deleteCommentById (id, db = connection) {
  return db('comments')
    .where('id', id)
    .del()
}

const connection = require('./connection')

module.exports = {
  getAllComments,
  getCommentsByPostId,
  postComment,
  deleteCommentById,
  deleteAllCommentsByPostId
}

function getAllComments (db = connection) {
  return db('comments')
    .select()
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

function postComment (comment, db = connection) {
  const { postId, author, createdOn, content } = comment
  return db('comments')
    .insert({
      post_id: postId,
      author,
      created_on: createdOn,
      content
    })
}

function deleteCommentById (id, db = connection) {
  return db('comments')
    .where('id', id)
    .del()
}

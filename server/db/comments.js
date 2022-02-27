const connection = require('./connection')

module.exports = {
  getAllComments,
  getCommentsByPostId,
  postComment,
  deleteCommentById,
  deleteAllCommentsByPostId,
  getCommentById,
  updateCommentById,
}

function getAllComments(db = connection) {
  return db('comments').select()
}

function getCommentsByPostId(id, db = connection) {
  return db('comments').where('post_id', id).select()
}

function deleteAllCommentsByPostId(id, db = connection) {
  return db('comments').where('post_id', id).del()
}

function getCommentById(id, db = connection) {
  return db('comments').where('id', id).select().first()
}

function postComment(comment, db = connection) {
  const { postId, author, createdOn, content } = comment
  return db('comments').insert({
    post_id: postId,
    author,
    created_on: createdOn,
    content,
  })
}

function deleteCommentById(id, db = connection) {
  return db('comments').where('id', id).del()
}

function updateCommentById(comment, db = connection) {
  const { id, postId, author, createdOn, content } = comment
  return db('comments')
    .where('id', id)
    .update({
      post_id: postId,
      author,
      created_on: createdOn,
      content,
    })
    .then(() => getCommentById(id, db))
}

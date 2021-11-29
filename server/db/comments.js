const connection = require('./connection')

module.exports = {
  getCommentsByPostId,
  postComment,
  deleteCommentById,
  deleteAllCommentsByPostId
}

function getCommentsByPostId (id, db = connection) {
  // get all of the comments for a blog post
}

function postComment (postId, comment, authorId, db = connection) {
  // takes post id, new comment, author id
  // post a new comment for a blog post
}

function deleteCommentById (id, db = connection) {

}

function deleteAllCommentsByPostId () {
  // delete all of the comments for a specific post
  // call when deleting a blog post
}

const { deleteAllCommentsByPostId } = require('./comments')
const connection = require('./connection')

module.exports = {
  getAllPosts,
  getPostsByGardenId,
  getPostById,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost,
}

function getAllPosts(db = connection) {
  return db('posts').select()
}

function getPostsByGardenId(id, db = connection) {
  return db('posts')
    .join('users', 'posts.author', 'users.id')
    .where('posts.garden_id', id)
    .select(
      'posts.id as id',
      'posts.garden_id as gardenId',
      'posts.author as author',
      'posts.title as title',
      'posts.created_on as createdOn',
      'posts.content as content',
      'users.first_name as firstName',
      'users.last_name as lastName'
    )
}

function getPostById(id, db = connection) {
  return db('posts')
    .join('users', 'posts.author', 'users.id')
    .where('posts.id', id)
    .select(
      'posts.id as id',
      'posts.garden_id as gardenId',
      'posts.author as author',
      'posts.title as title',
      'posts.created_on as createdOn',
      'posts.content as content',
      'users.first_name as firstName',
      'users.last_name as lastName'
    )
    .first()
}

function addBlogPost(newPost, db = connection) {
  const { gardenId, author, title, createdOn, content } = newPost
  return db('posts').insert({
    garden_id: gardenId,
    author,
    title,
    created_on: createdOn,
    content,
  })
}

function updateBlogPost(updatedPost, db = connection) {
  const { id, gardenId, author, title, createdOn, content } = updatedPost
  return db('posts')
    .where('id', id)
    .update({
      garden_id: gardenId,
      author,
      title,
      created_on: createdOn,
      content,
    })
    .then(() => getPostById(id, db))
}

function deleteBlogPost(id, db = connection) {
  return db('posts')
    .where('posts.id', id)
    .del()
    .then(() => deleteAllCommentsByPostId(id, db))
}

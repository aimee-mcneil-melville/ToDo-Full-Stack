const connection = require('./connection')

module.exports = {
  getPostsByGardenId,
  getPostById,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost
}

function getPostsByGardenId (id, db = connection) {
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

function getPostById (id, db = connection) {
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

function addBlogPost (newPost, db = connection) {
  const { gardenId, author, title, createdOn, content } = newPost
  return db('posts')
    .insert({
      garden_id: gardenId,
      author,
      title,
      created_on: createdOn,
      content
    })
}

function updateBlogPost (post, db = connection) {
  // function to patch an existing blog post
}

function deleteBlogPost (id, db = connection) {
  // function to delete blog post from db (posts table)
  // should also delete all comments relating to the blog post from the comments table
  return db('posts')
    .where('posts.id', id)
    .del()
}

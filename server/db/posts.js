const connection = require('./connection')

module.exports = {
  getPostsByGardenId,
  getPostById,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost
}

function getPostsByGardenId (id, db = connection) {
  // function to get all of the posts for a specific garden
  // add in name of author
  return db('posts')
    .where('garden_id', id)
    .select()
}

function getPostById (id, db = connection) {
  return db('posts')
    .where('id', id)
    .then(result => {
      const post = result[0]
      return {
        id: post.id,
        gardenId: post.garden_id,
        author: post.author,
        title: post.title,
        createdOn: post.created_on,
        content: post.content
      }
    })
}

function addBlogPost (newPost, db = connection) {
  const { id, gardenId, author, title, createdOn, content } = newPost
  return db('posts')
    .insert({
      id,
      garden_id: gardenId,
      author,
      title,
      created_on: createdOn,
      content
    })
    .then((posts) => getPostById(posts[0], db))
}

function updateBlogPost (post, db = connection) {
  // function to patch an existing blog post
}

function deleteBlogPost (id, db = connection) {
  // function to delete blog post from db (posts table)
  // should also delete all comments relating to the blog post from the comments table
}

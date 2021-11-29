const connection = require('./connection')

module.exports = {
  getAllPosts,
  getPostsByGardenId,
  getPostById,
  addBlogPost,
  updateBlogPost,
  deleteBlogPost
}

function getAllPosts (db = connection) {
  return db('posts')
    .then(posts => {
      return posts
    })
}

function getPostsByGardenId (id, db = connection) {
  // function to get all of the posts for a specific garden
  // add in name of author
  return db('posts')
    .where('garden_id', id)
    .then(posts => {
      return posts
    })
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

// Create, read, update, delete
// DB function planning
// In blogs.js
// As a user, I want to see all blogs on the homepage
// Test that the correct number of blogs are posted (all posts of all blogs)

// In posts.js
// As a user, I want to see only the blog posts for my garden on my garden's page
// As a user, I want to see the name of the author for a post
// Delete the posts

// In comments.js
// As a user, I want to see all of the comments for a blog post displayed with the relevant blog
// As a user, I want to see the name of the author for a comment

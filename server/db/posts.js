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
// Create function to get all posts regardless of garden id
}

function getPostsByGardenId (id, db = connection) {
  // function to get all of the posts for a specific garden
  // add in name of author
  return db('posts')
    .join('id', 'post_id')
}

function getPostById (id, db = connection) {
  return db('posts')
    .where('id', id)
    .then(result => {
      const post = result[0]
      console.log('post: ', post)
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

function addBlogPost (post, db = connection) {
  // function to add a new blog post to the db (posts table)
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

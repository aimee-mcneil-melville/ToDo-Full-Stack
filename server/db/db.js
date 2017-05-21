const path = require('path')
const config = require(path.join(__dirname, '/../../knexfile')).development
const knex = require('knex')(config)

const _ = require('lodash')

function getPosts (){
  return knex('posts')
    // .then(convertArrayToCamelCase)
}

function addPost (post) {
  return knex('posts').insert(convertObjectToSnakeCase(post))
    .then((result) => knex('posts').where({ id: result[0] }))
    .then((result) => convertArrayToCamelCase(result)[0])
}

function updatePostById (id, post) {
  return knex('posts').update(convertObjectToSnakeCase(post)).where({ id: id })
    .then((result) => knex('posts').where({ id: id }))
    .then((result) => convertArrayToCamelCase(result)[0])
}

function deletePostById (id) {
  return knex('posts').where({ id: id }).del()
}

function getCommentsByPostId (postId) {
  return knex('comments').where({ post_id: postId })
    .then(convertArrayToCamelCase)
}

function addComment (comment) {
  return knex('comments').insert(convertObjectToSnakeCase(comment))
    .then((result) => knex('comments').where({ id: result[0] }))
    .then((result) => convertArrayToCamelCase(result)[0])
}

function updateCommentById (id, comment) {
  return knex('comments').update(convertObjectToSnakeCase(comment)).where({ id: id })
    .then((result) => knex('comments').where({ id: id }))
    .then((result) => convertArrayToCamelCase(result)[0])
}

function deleteCommentById (id) {
  return knex('comments').where({ id: id }).del()
}

function convertArrayToCamelCase (arr) {
  return arr.map(element => {
    return _.mapKeys(element, (value, key) =>{ 
      return _.camelCase(key)
    })
  })
}

function convertObjectToSnakeCase (obj) {
  return _.mapKeys(obj, (value, key) =>{ 
    return _.snakeCase(key)
  })
}

module.exports = {
  getPosts: getPosts,
  addPost: addPost,
  updatePostById: updatePostById,
  deletePostById: deletePostById,
  getCommentsByPostId: getCommentsByPostId,
  addComment: addComment,
  updateCommentById: updateCommentById,
  deleteCommentById: deleteCommentById
}
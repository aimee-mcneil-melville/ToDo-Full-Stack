import knexFile from './knexfile'
import knex from 'knex'

const config = knexFile.development
// eslint-disable-next-line no-unused-vars
const connection = knex(config)

const postToCamelCase = (post: any) => ({
  id: post.id,
  title: post.title,
  dateCreated: post.date_created,
  text: post.text,
})

const postFromCamelCase = (camel: any) => ({
  id: camel.id,
  title: camel.title,
  date_created: camel.dateCreated,
  text: camel.text,
})

const commentToCamelCase = (comment: any) => ({
  id: comment.id,
  postId: comment.post_id,
  datePosted: comment.date_posted,
  comment: comment.comment,
})

const commentFromCamelCase = (camel: any) => ({
  id: camel.id,
  post_id: camel.postId,
  date_posted: camel.datePosted,
  comment: camel.comment,
})

export const allPosts = async (db = connection) => {
  const db_posts = await db('Posts').select('*')
  return db_posts.map(postToCamelCase)
}

export const getPost = async (id: number, db = connection) => {
  const db_post = await db.select('Posts').where({ id }).first()
  return postToCamelCase(db_post)
}

export const getCommentsForPost = async (id: number, db = connection) => {
  const comments = await db('Comments').select().where({ post_id: id })
  return comments.map(commentToCamelCase)
}

export const updatePost = async (id: number, camel: any, db = connection) => {
  const db_post = postFromCamelCase(camel)
  return await db('Posts').update(db_post).where({ id })
}

export const deletePost = async (id: number, db = connection) => {
  await db('Posts').delete().where({ id })
}

export const updateComment = async (
  id: number,
  camel: any,
  db = connection
) => {
  const db_comment = commentFromCamelCase(camel)
  await db('Comments').update(db_comment).where({ id })
}

export const deleteComment = async (id: number, db = connection) => {
  await db('Comments').delete().where({ id })
}

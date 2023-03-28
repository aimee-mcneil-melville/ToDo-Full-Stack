import request from 'superagent'

import { Comment } from '../../models/comment'
import { Post, PostData } from '../../models/post'

export function getPosts(): Promise<Post[]> {
  return request
    .get('/v1/posts')
    .then((res) => {
      res.body.forEach((post: string) => validateNoSnakeCase(post))
      return res.body
    })
    .catch(errorHandler('GET', '/v1/posts'))
}

export function addPost(post: PostData): Promise<Post> {
  return request
    .post('/v1/posts')
    .send(post)
    .then((res) => {
      validateNoSnakeCase(res.body)
      validatePostResponse('POST', 'v1/posts', res.body)
      return res.body
    })
    .catch(errorHandler('POST', '/v1/posts'))
}

export function updatePost(postId: string, post: PostData): Promise<Post> {
  return request
    .patch(`/v1/posts/${postId}`)
    .send(post)
    .then((res) => {
      validateNoSnakeCase(res.body)
      validatePostResponse('PATCH', 'v1/posts/:id', res.body)
      return res.body
    })
    .catch(errorHandler('PATCH', '/v1/posts/:id'))
}

export function deletePost(postId: number): Promise<unknown> {
  return request
    .del(`/v1/posts/${postId}`)
    .then((res) => res)
    .catch(errorHandler('DELETE', '/v1/posts/:id'))
}

export function getCommentsByPostId(postId: number): Promise<Comment[]> {
  return request
    .get(`/v1/posts/${postId}/comments`)
    .then((res) => {
      res.body.forEach((comment: Comment) => validateNoSnakeCase(comment))
      return res.body
    })
    .catch(errorHandler('GET', '/v1/posts/:id/comments'))
}

export function addCommentByPostId(postId: number, comment: string) {
  return request
    .post(`/v1/posts/${postId}/comments`)
    .send({ comment })
    .then((res) => {
      validateNoSnakeCase(res.body)
      return res.body
    })
    .catch(errorHandler('POST', '/v1/posts/:id/comments'))
}

export function updateComment(id: number, comment: string): Promise<unknown> {
  return request
    .patch(`/v1/comments/${id}`)
    .send({ comment })
    .then((res) => {
      validateNoSnakeCase(res.body)
      return res.body
    })
    .catch(errorHandler('PATCH', '/v1/comments/:id'))
}

export function deleteComment(commentId: number): Promise<unknown> {
  return request
    .del(`/v1/comments/${commentId}`)
    .then((res) => res)
    .catch(errorHandler('DELETE', '/v1/comments/:id'))
}

function errorHandler(method: string, route: string) {
  return (err: Error) => {
    if (err.message === 'Not Found') {
      throw Error(
        `Error: You need to implement an API route for ${method} ${route}`
      )
    } else {
      throw Error(`${err.message} on ${method} ${route}`)
    }
  }
}

function validateNoSnakeCase(response: string | Comment) {
  const hasSnakeCase = Object.keys(response).some((key) => key.includes('_'))
  if (hasSnakeCase) {
    throw Error('Error: you should not be returning properties in snake_case')
  }
}

function validatePostResponse(method: string, route: string, post: Post) {
  if (!post) {
    throw Error(`Error: ${method} ${route} should return a blog post`)
  }

  const { title, text } = post

  if (!title || !text) {
    throw Error(
      `Error: ${method} ${route} is not returning a correct blog post`
    )
  }
}

// TODO: Use this.
// function validateCommentResponse (method, route, comment) {
//   if (!comment) {
//     throw Error(`Error: ${method} ${route} should return a comment`)
//   }

//   const { title, text } = comment

//   if (!title || !text) {
//     throw Error(`Error: ${method} ${route} is not returning a correct comment`)
//   }
// }

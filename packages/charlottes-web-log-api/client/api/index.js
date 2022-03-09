import request from 'superagent'

export function getPosts() {
  return request
    .get('/v1/posts')
    .then((res) => {
      res.body.forEach((post) => validateNoSnakeCase(post))
      return res.body
    })
    .catch(errorHandler('GET', '/v1/posts'))
}

export function addPost(post) {
  // convert the large paragraphs string into an array of paragraphs
  post.paragraphs = post.paragraphs.split('\n')
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

export function updatePost(post) {
  // convert the large paragraphs string into an array of paragraphs
  post.paragraphs = post.paragraphs.split('\n')
  return request
    .patch(`/v1/posts/${post.id}`)
    .send(post)
    .then((res) => {
      validateNoSnakeCase(res.body)
      validatePostResponse('PATCH', 'v1/posts/:id', res.body)
      return res.body
    })
    .catch(errorHandler('PATCH', '/v1/posts/:id'))
}

export function deletePost(postId) {
  return request
    .del(`/v1/posts/${postId}`)
    .then((res) => res)
    .catch(errorHandler('DELETE', '/v1/posts/:id'))
}

export function getCommentsByPostId(postId) {
  return request
    .get(`/v1/posts/${postId}/comments`)
    .then((res) => {
      validateNoSnakeCase(res.body)
      return res.body
    })
    .catch(errorHandler('GET', '/v1/posts/:id/comments'))
}

export function addCommentByPostId(postId, comment) {
  return request
    .post(`/v1/posts/${postId}/comments`)
    .send(comment)
    .then((res) => {
      validateNoSnakeCase(res.body)
      return res.body
    })
    .catch(errorHandler('POST', '/v1/posts/:id/comments'))
}

export function updateComment(comment) {
  return request
    .patch(`/v1/comments/${comment.id}`)
    .send(comment)
    .then((res) => {
      validateNoSnakeCase(res.body)
      return res.body
    })
    .catch(errorHandler('PATCH', '/v1/comments/:id'))
}

export function deleteComment(commentId) {
  return request
    .del(`/v1/comments/${commentId}`)
    .then((res) => res)
    .catch(errorHandler('DELETE', '/v1/comments/:id'))
}

function errorHandler(method, route) {
  return (err) => {
    if (err.message === 'Not Found') {
      throw Error(
        `Error: You need to implement an API route for ${method} ${route}`
      )
    } else {
      throw Error(`${err.message} on ${method} ${route}`)
    }
  }
}

function validateNoSnakeCase(response) {
  const hasSnakeCase = Object.keys(response).some((key) => key.includes('_'))
  if (hasSnakeCase) {
    throw Error('Error: you should not be returning properties in snake_case')
  }
}

function validatePostResponse(method, route, post) {
  if (!post) {
    throw Error(`Error: ${method} ${route} should return a blog post`)
  }

  const { title, paragraphs } = post

  if (!title || !paragraphs) {
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

//   const { title, paragraphs } = comment

//   if (!title || !paragraphs) {
//     throw Error(`Error: ${method} ${route} is not returning a correct comment`)
//   }
// }

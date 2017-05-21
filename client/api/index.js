import request from 'superagent'

export function getPosts () {
  return request.get('/v1/posts')
    .then(data => {
      const posts = data.body
      return posts.map(post => {
        return Object.assign(
          {},
          post,
          { paragraphs: JSON.parse(post.paragraphs) }
        )
      })
    })
    .catch(err => {
      throw Error('You need to implement a post route!')
    })
}

export function addPost (post) {
  return request.post('/v1/posts')
    .send(post)
    .then(data => {
      const returnedPost = data.body
      return returnedPost
    })
}

export function updatePost (post) {
  return request.put(`/v1/posts/${post.id}`)
    .send(post)
    .then(data => {
      const returnedPost = data.body
      return returnedPost
    })
}

export function deletePost (postId) {
  return request.del(`/v1/posts/${postId}`)
  .then(data => {
    const returnedPost = data.body
    return returnedPost
  })
}

export function getCommentsByPostId(postId) {
  return request.get(`/v1/posts/${postId}/comments`)
    .then(data => {
      const returnedComments = data.body
      return returnedComments
    })
}

export function addCommentByPostId(postId, comment) {
  return request.post(`/v1/posts/${postId}/comments`)
    .send(comment)
    .then(data => {
      const returnedComment = data.body
      return returnedComment
    })
}

export function updateComment (comment) {
  return request.put(`/v1/comments/${comment.id}`)
    .send(comment)
    .then(data => {
      const returnedComment = data.body
      return returnedComment
    })
}

export function deleteComment (commentId) {
  return request.del(`/v1/comments/${commentId}`)
  .then(data => {
    const returnedComment = data.body
    return returnedComment
  })
}
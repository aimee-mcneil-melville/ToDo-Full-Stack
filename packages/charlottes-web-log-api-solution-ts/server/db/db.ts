import connection from './connection'

export function getAllPosts(db = connection) {
  return db('posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
  )
}

export function getPost(id: number, db = connection) {
  return db('posts')
    .select('id', 'title', 'date_created as dateCreated', 'text')
    .where('id', id)
    .first()
}
// TODO: rather than making a second database call to fetch the newly-created
// (or newly-updated) record, a more efficient approach would be to reconstruct
// the record based on the details passed in, plus the id returned from the first
// database call
export function addPost(
  post: { title: string; text: string },
  db = connection
) {
  return db('posts')
    .insert({ ...post, date_created: Date.now() })
    .then((ids) => {
      return getPost(ids[0])
    })
}

export function updatePost(
  id: number,
  post: { title: string; text: string },
  db = connection
) {
  return db('posts')
    .update({ title: post.title, text: post.text })
    .where('id', id)
    .then(() => {
      return getPost(id)
    })
}

// TODO: when deleting a post, also delete its comments
export function deletePost(id: number, db = connection) {
  return db('posts').delete().where('id', id)
}

export function getComments(postId: number, db = connection) {
  return db('comments')
    .select('id', 'post_id as postId', 'date_posted as datePosted', 'comment')
    .where('post_id', postId)
}

export function getComment(id: number, db = connection) {
  return db('comments')
    .select('id', 'post_id as postId', 'date_posted as datePosted', 'comment')
    .where('id', id)
    .first()
}

export function addComment(
  postId: number,
  comment: { comment: string },
  db = connection
) {
  return db('comments')
    .insert({
      post_id: postId,
      date_posted: Date.now(),
      comment: comment.comment,
    })
    .then((ids) => {
      return getComment(ids[0])
    })
}

export function updateComment(
  id: number,
  comment: { comment: string },
  db = connection
) {
  return db('comments')
    .update({
      comment: comment.comment,
    })
    .where('id', id)
    .then(() => {
      return getComment(id)
    })
}

export function deleteComment(id: number, db = connection) {
  return db('comments').delete().where('id', id)
}

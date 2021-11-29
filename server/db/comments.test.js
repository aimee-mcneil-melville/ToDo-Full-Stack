const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./comments')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getCommentsByPostId', () => {
  it('returns all comments for a specific post', () => {
    return db.getCommentsByPostId(1, testDb)
      .then(comments => {
        expect(comments).toHaveLength(1)
        return null
      })
  })
})

describe('deleteAllCommentsByPostId', () => {
  it('deletes all comments with specified post id', () => {
    return db.deleteAllCommentsByPostId(1, testDb)
      .then(() => {
        return db.getAllComments(testDb)
      })
      .then(comments => {
        const filtered = comments.filter(e => e.id === 1)
        expect(filtered).toEqual([])
        return null
      })
  })
})

describe('postComment', () => {
  it('posts a new comment', () => {
    const newComment = {
      postId: 1,
      author: 1,
      createdOn: '10/10',
      content: 'wow, cool gardens!'
    }
    return db.postComment(newComment, testDb)
      .then((comment) => {
        const id = comment[0]
        return db.getCommentById(id, testDb)
      })
      .then(comment => {
        const newComment = comment[0]
        expect(newComment.post_id).toBe(1)
        return null
      })
  })
})

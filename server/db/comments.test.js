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
    return db.getCommentsByPostId(1, testDb).then((comments) => {
      expect(comments).toHaveLength(1)
      expect(comments[0].content).toMatch(
        'Twas a wonderful day for lettuce picking!'
      )
      expect(comments[0].post_id).toBe(1)
      return null
    })
  })
})

describe('deleteAllCommentsByPostId', () => {
  it('deletes all comments with specified post id', () => {
    return db
      .deleteAllCommentsByPostId(1, testDb)
      .then(() => {
        return db.getAllComments(testDb)
      })
      .then((comments) => {
        const filtered = comments.filter((e) => e.id === 1)
        expect(filtered).toHaveLength(0)
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
      content: 'wow, cool gardens!',
    }
    return db
      .postComment(newComment, testDb)
      .then((comment) => {
        const id = comment[0]
        return db.getCommentById(id, testDb)
      })
      .then((comment) => {
        expect(comment.post_id).toBe(1)
        expect(comment.author).toBe(1)
        expect(comment.content).toMatch('wow, cool gardens!')
        return null
      })
  })
})

describe('deleteCommentById', () => {
  it('deletes a comment by the comments id', () => {
    return db
      .deleteCommentById(1, testDb)
      .then(() => db.getAllComments(testDb))
      .then((comments) => {
        const filtered = comments.filter((e) => e.id === 1)
        expect(filtered).toHaveLength(0)
        return null
      })
  })
})

describe('updateCommentById', () => {
  it('returns an updated comment', () => {
    const updatedComment = {
      id: 1,
      postId: 1,
      author: 2,
      createdOn: '10-24-12',
      content: 'Hah! I changed my comment!',
    }

    return db.updateCommentById(updatedComment, testDb).then((comment) => {
      expect(comment.id).toBe(1)
      expect(comment.content).toMatch('Hah! I changed my comment!')
      expect(comment.author).toBe(2)
      return null
    })
  })
})

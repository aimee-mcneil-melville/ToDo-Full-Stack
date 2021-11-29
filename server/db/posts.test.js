const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./posts')

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

describe('getPostsByGardenId', () => {
  it('return all of the posts related to the garden id', () => {
    return db.getPostsByGardenId(1, testDb)
      .then((posts) => {
        expect(posts).toHaveLength(2)
        return null
      })
  })
})

describe('getPostById', () => {
  it('returns the correct Post', () => {
    return db.getPostById(1, testDb)
      .then((post) => {
        expect(post.id).toBe(1)
        expect(post.gardenId).toBe(1)
        expect(post.author).toBe(2)
        expect(post.title).toMatch('Lettuce Picking Season')
        return null
      })
  })
})

describe('addBlogPost', () => {
  it('adds the new blog post to the db', () => {
    const newPost = {
      id: 7,
      gardenId: 7,
      author: 7,
      title: 'Testing the tests',
      createdOn: '30/11/2021',
      content: 'This is just a test'
    }
    return db.addBlogPost(newPost, testDb)
      .then((post) => {
        expect(post.id).toBe(7)
        expect(post.gardenId).toBe(7)
        expect(post.author).toBe(7)
        expect(post.title).toMatch('Testing the tests')
        return null
      })
  })
})

describe('deleteBlogPost', () => {
  it('deletes the blog post from the db by id', () => {
    return db.deleteBlogPost(1, testDb)
      .then(post => {
        expect(post).toBe(2)// meaningless to make linter happy
        return post
        // maybe expect status of getting the post by id to return an error?
      })
  })

  it('removes all of the comments on the blog post from the comments table', () => {
    // Do it
  })
})

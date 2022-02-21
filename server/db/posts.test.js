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

describe('getAllPosts', () => {
  it('gets all blog posts', () => {
    return db.getAllPosts(testDb).then((posts) => {
      expect(posts).toHaveLength(2)
      expect(posts[0].title).toMatch('Lettuce Picking Season')
      expect(posts[1].title).toMatch('Where are my CABBAGES')
      return null
    })
  })
})

describe('getPostsByGardenId', () => {
  it('return all of the posts related to the garden id', () => {
    return db.getPostsByGardenId(1, testDb).then((posts) => {
      expect(posts).toHaveLength(2)
      expect(posts[1].title).toMatch('Where are my CABBAGES')
      return null
    })
  })
})

describe('getPostById', () => {
  it('returns the correct Post', () => {
    return db.getPostById(1, testDb).then((post) => {
      expect(post.id).toBe(1)
      expect(post.gardenId).toBe(1)
      expect(post.author).toBe(2)
      expect(post.title).toMatch('Lettuce Picking Season')
      return null
    })
  })
  it('returns the correct name of the author', () => {
    return db.getPostById(1, testDb).then((post) => {
      expect(post.firstName).toMatch('User')
      expect(post.lastName).toMatch('second')
      return null
    })
  })
})

describe('addBlogPost', () => {
  it('adds the new blog post to the db', () => {
    const newPost = {
      gardenId: 7,
      author: 1,
      title: 'Testing the tests',
      createdOn: '30/11/2021',
      content: 'This is just a test',
    }
    return db
      .addBlogPost(newPost, testDb)
      .then(([id]) => {
        return db.getPostById(id, testDb)
      })
      .then((post) => {
        expect(post.id).toBe(3)
        expect(post.gardenId).toBe(7)
        expect(post.author).toBe(1)
        expect(post.title).toMatch('Testing the tests')
        return null
      })
  })
})

describe('deleteBlogPost', () => {
  it('deletes the blog post from the db by id', () => {
    return db
      .deleteBlogPost(1, testDb)
      .then(() => db.getAllPosts(testDb))
      .then((posts) => {
        const filtered = posts.filter((element) => element.id === 1)
        expect(filtered).toHaveLength(0)
        return null
      })
  })

  it.todo('deletes all child comments')
})

describe('updateBlogPost', () => {
  it('returns updated post', () => {
    const updatedPost = {
      id: 1,
      gardenId: 1,
      author: 2,
      title: 'Woohoo! I was updated!',
      created_on: '2021-10-10',
      content: 'This is a cool update',
    }
    return db.updateBlogPost(updatedPost, testDb).then((post) => {
      expect(post.title).toMatch('Woohoo! I was updated!')
      expect(post.content).toMatch('This is a cool update')
      return null
    })
  })
})

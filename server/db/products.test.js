const env = require('./testing/testEnv')
const db = require('./products')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('listProducts returns an array of products', () => {
  return db.listProducts(testDb)
    .then(products => {
      expect(products).toHaveLength(3)
    })
})

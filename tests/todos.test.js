const testEnv = require('./test-environment')
const todos = require('../todo')

let testDb = null

// Create a separate in-memory database before each test.
beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

// Destroy the database connection after each test.
afterEach(() => testEnv.cleanup(testDb))

// This will fail until you:
//  - export the `getAll` function
//  - modify it to allow a test database to be passed in as a function parameter
test('getAll returns three todos', () => {
  // Arrange
  const expected = 3

  // Act
  // Be sure to always use `return` when testing with promises
  return todos.getAll(testDb)
    .then(results => {
      const actual = results.length

      // When testing async functions, we always assert inside `.then`. Why?

      // Assert
      expect(actual).toBe(expected)
    })
})

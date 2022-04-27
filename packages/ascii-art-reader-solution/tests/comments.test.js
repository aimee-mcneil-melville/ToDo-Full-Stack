const fs = require('fs')

const comments = require('../comments')

// Notice that some functions have been written to allow
// an optional 'filename' parameter. This lets us pass the
// location of our fake comments file, making the functions
// a little more testable.
test('comments.get returns correct text', () => {
  // Arrange
  const expected = 'wombat\n'

  // Act
  comments.get(assert, 'tests/data/comments-to-read.txt')

  function assert (err, actual) {
    expect(err).toBeFalsy()

    // Assert
    expect(actual).toBe(expected)
  }
})

// Normally, we don't hit the filesystem for ordinary tests
// However, it does let us practice callbacks within callbacks
test('comments.erase removes all content in the comments file', () => {
  // Arrange
  const expected = ''
  const filename = 'tests/data/comments-to-erase.txt'


  // Act
  comments.erase(assert, filename)

  function assert () {
    fs.readFile(filename, 'utf8', function (err, actual) {
      expect(err).toBeFalsy()

      // Assert
      expect(actual).toBe(expected)

      // Return file to it's original state
      fs.writeFile(filename, 'wombat\n', 'utf8', function (err) {
        expect(err).toBeFalsy()
      })
    })
  }
})

test('comments.save correctly modifies file content', () => {
  // Arrange
  const filename = 'tests/data/comments-to-save.txt'
  const expected = 'wombat\naardvark\n'

  // Act
  comments.save('aardvark', assert, filename)

  function assert () {
    fs.readFile(filename, 'utf8', (err, actual) => {
      expect(err).toBeFalsy()

      // Assert
      expect(actual).toBe(expected)

      // Return file to it's original state
      fs.writeFile(filename, 'wombat\n', 'utf8', err => {
        expect(err).toBeFalsy()
      })
    })
  }
})

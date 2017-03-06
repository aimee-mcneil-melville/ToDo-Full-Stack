var fs = require('fs')
var test = require('tape')

var comments = require('../comments')

// Notice that some functions have been written to allow
// an optional 'filename' parameter. This lets us pass the
// location of our fake comments file, making the functions
// a little more testable.
test('comments.get returns correct text', function (t) {
  // Arrange
  var expected = 'wombat\n'

  // Act
  comments.get(assert, 'tests/data/comments.txt')

  function assert (err, actual) {
    t.error(err, 'comments.txt: READ OK')

    // Assert
    t.equal(actual, expected)
    t.end()
  }
})

// Normally, we don't hit the filesystem for ordinary tests. However, it does
// let us practice callbacks within callbacks!
test('comments.erase removes all content in the comments file', function (t) {
  // Arrange
  var expected = ''


  // Act
  comments.erase(assert, 'tests/data/comments.txt')

  function assert () {
    fs.readFile('tests/data/comments.txt', 'utf8', function (err, actual) {
      t.error(err, 'comments.txt: READ OK')

      // Assert
      t.equal(actual, expected)

      // Return file to it's original state
      fs.writeFile('tests/data/comments.txt', 'wombat\n', 'utf8', function (err) {
        t.error(err, 'comments.txt: WRITE OK')

        // Notice we put the call to end() inside the very last callback!
        t.end()
      })
    })
  }
})

test('comments.save correctly modifies file content', function (t) {
  // Arrange
  var expected = 'wombat\naardvark\n'

  // Act
  comments.save('aardvark', assert, 'tests/data/comments.txt')

  function assert () {
    fs.readFile('tests/data/comments.txt', 'utf8', function (err, actual) {
      t.error(err, 'comments.txt: READ OK')

      // Assert
      t.equal(actual, expected)

      fs.writeFile('tests/data/comments.txt', 'wombat\n', 'utf8', function (err) {
        t.error(err, 'comments.txt: WRITE OK')
        t.end()
      })
    })
  }
})

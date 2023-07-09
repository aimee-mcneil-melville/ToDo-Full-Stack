import { test, expect} from 'vitest'
import * as fs from 'node:fs/promises'
import * as comments from '../comments.js'


// Notice that some functions have been written to allow
// an optional 'filename' parameter. This lets us pass the
// location of our fake comments file, making the functions
// a little more testable.
test('comments.get returns correct text', async () => {
  // Arrange
  const expected = 'wombat\n'

  // Act
  const actual = await comments.get('tests/data/comments-to-read.txt')

  // Assert
  expect(actual).toBe(expected)
})

test('comments.erase removes all content in the comments file', async () => {
  // Arrange
  const expected = ''
  const filename = 'tests/data/comments-to-erase.txt'
  try {
    // Act
    await comments.erase(filename)
    const actual = await fs.readFile(filename, 'utf8')

    // Assert
    expect(actual).toBe(expected)
  } finally {
    // Return file to it's original state
    await fs.writeFile(filename, 'wombat\n', 'utf8')
  }
})

test('comments.save correctly modifies file content', async () => {
  // Arrange
  const filename = 'tests/data/comments-to-save.txt'
  const expected = 'wombat\naardvark\n'
  try {
  // Act
  await comments.save('aardvark', filename)

  const actual = await fs.readFile(filename, 'utf8')
  // Assert
  expect(actual).toBe(expected)

  } finally {
      // Return file to it's original state
    await fs.writeFile(filename, 'wombat\n', 'utf8')
  }
})

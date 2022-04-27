const game = require('../game')

const simpleGame = [
  [1, 2], [6, 4], [5, 4], [10, 0], [7, 2], [10, 0], [10, 0], [5, 2], [7, 0], [4, 4]
]// 3       18      27       46      55       80       97      104     111     119

const perfectGame = [
  [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 10, 10]
]//  30       60       90       120      150      180      210      240      270      300

const spareInLastFrame = [
  [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [6, 4, 8]
]// 3       18      27     46     55     80    97     104     111     129

const strikeInLastFrame = [
  [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [10, 4, 5]
]// 3       18      27     46     55     80    97     104     111      130

test('scoreFrame: gutterball', () => {
  const frame = [0, 0]
  expect(game.scoreFrame(frame)).toBe(0)
})

test('scoreFrame: open frame', () => {
  // Arrange
  const frame = [2, 6]
  const expected = 8

  // Act
  const actual = game.scoreFrame(frame)

  // Assert
  expect(actual).toBe(expected)
})

test('scoreSpare: works', () => {
  const frame1 = [5, 5]
  const frame2 = [2, 0]
  const expected = 12
  const actual = game.scoreSpare(frame1, frame2)
  expect(actual).toBe(expected)
})

test('scoreStrike: single strike', () => {
  const frame1 = [10, 0]
  const frame2 = [2, 5]
  const expected = 17
  const actual = game.scoreStrike(frame1, frame2)
  expect(actual).toBe(expected)
})

test('isStrike: detects a strike', () => {
  const frame = [10, 0]
  const expected = true
  const actual = game.isStrike(frame)
  expect(actual).toBe(expected)
})

test('isStrike: does not give false positives', () => {
  const frame = [0, 10]
  const expected = false
  const actual = game.isStrike(frame)
  expect(actual).toBe(expected)
})

test('isSpare: detects a spare', () => {
  const frame = [2, 8]
  const expected = true
  const actual = game.isSpare(frame)
  expect(actual).toBe(expected)
})

test('isSpare: detects a hard spare', () => {
  const frame = [0, 10]
  const expected = true
  const actual = game.isSpare(frame)
  expect(actual).toBe(expected)
})

test('sumFrame: sums a frame', () => {
  const frame = [2, 3]
  const expected = 5
  const actual = game.sumFrame(frame)
  expect(actual).toBe(expected)
})

test('scoreStrike: single strike', () => {
  const frame1 = [10, 0]
  const frame2 = [2, 5]
  const expected = 17
  const actual = game.scoreStrike(frame1, frame2)
  expect(actual).toBe(expected)
})

test('scoreStrike: multiple strikes', () => {
  const frame1 = [10, 0]
  const frame2 = [10, 0]
  const frame3 = [10, 0]
  const expected = 30
  const actual = game.scoreStrike(frame1, frame2, frame3)
  expect(actual).toBe(expected)
})

test('score: simple game', () => {
  const expected = 119
  const actual = game.score(simpleGame)
  expect(actual).toBe(expected)
})

test('score: perfect game', () => {
  const expected = 300
  const actual = game.score(perfectGame)
  expect(actual).toBe(expected)
})

test('score: spare in 10th frame', () => {
  const expected = 129
  const actual = game.score(spareInLastFrame)
  expect(actual).toBe(expected)
})

test('score: strike in 10th frame', () => {
  const expected = 130
  const actual = game.score(strikeInLastFrame)
  expect(actual).toBe(expected)
})

test('recursiveScore: simple game', () => {
  const expected = 119
  const actual = game.recursiveScore(simpleGame)
  expect(actual).toBe(expected)
})

test('recursiveScore: perfect game', () => {
  const expected = 300
  const actual = game.recursiveScore(perfectGame)
  expect(actual).toBe(expected)
})

test('iterativeScore: simple game', () => {
  const expected = 119
  const actual = game.iterativeScore(simpleGame)
  expect(actual).toBe(expected)
})

test('iterativeScore: perfect game', () => {
  const expected = 300
  const actual = game.iterativeScore(perfectGame)
  expect(actual).toBe(expected)
})

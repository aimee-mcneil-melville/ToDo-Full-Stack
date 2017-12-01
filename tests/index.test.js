const game = require('../game')

test('test setup working', function () {
  expect(true).toBeTruthy()
})

test('scores a gutterball frame', function () {
  const frame = [0, 0]
  const score = game.scoreFrame(frame)
  expect(score).toBe(0)
})

test('scores a normal frame', function () {
  const frame = [2, 3]
  const score = game.scoreFrame(frame)
  expect(score).toBe(5)
})

test('scores a spare frame', function () {
  const frame = [2, 8]
  const nextFrame = [6, 3]
  const score = game.scoreFrame(frame, nextFrame)
  expect(score).toBe(16)
})

test('scores a single strike frame', function () {
  const frame = [10]
  const nextFrame = [6, 3]
  const score = game.scoreFrame(frame, nextFrame)
  expect(score).toBe(19)
})

test('scores a double strike frame', function () {
  const frame = [10]
  const nextFrame = [10]
  const anotherFrame = [8, 1]
  const score = game.scoreFrame(frame, nextFrame, anotherFrame)
  expect(score).toBe(28)
})

test('scores a game', function () {
  const frames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [4, 4]
  ] // 3      18      27     46     55     80    97     104     111     119
  const score = game.scoreGame(frames)
  expect(score).toBe(119)
})

test('scores a spare in the 10th frame', function () {
  const spareFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [6, 4, 8]
  ] // 3      18      27     46     55     80    97     104     111     129
  const spareScore = game.scoreGame(spareFrames)
  expect(spareScore).toBe(129)
})

test('scores a strike in the 10th frame', function () {
  const strikeFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [10, 4, 5]
  ] // 3      18      27     46     55     80    97     104     111      130
  const strikeScore = game.scoreGame(strikeFrames)
  expect(strikeScore).toBe(130)
})

test('scores a perfect game', function () {
  const perfectGame = [
    [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10,0], [10,0], [10, 0], [10, 0], [10, 10, 10]
  ] 
  const perfectScore = game.scoreGame(perfectGame)
  expect(perfectScore).toBe(300)
})


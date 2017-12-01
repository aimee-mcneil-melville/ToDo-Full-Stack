var game = require('../game')

test('test setup working', function () {
  expect(true).toBeTruthy()
})

test('scores a gutterball frame', function () {
  var frame = [0, 0]
  var score = game.scoreFrame(frame)
  expect(score).toBe(0)
})

test('scores a normal frame', function () {
  var frame = [2, 3]
  var score = game.scoreFrame(frame)
  expect(score).toBe(5)
})

test('scores a spare frame', function () {
  var frame = [2, 8]
  var nextFrame = [6, 3]
  var score = game.scoreFrame(frame, nextFrame)
  expect(score).toBe(16)
})

test('scores a single strike frame', function () {
  var frame = [10]
  var nextFrame = [6, 3]
  var score = game.scoreFrame(frame, nextFrame)
  expect(score).toBe(19)
})

test('scores a double strike frame', function () {
  var frame = [10]
  var nextFrame = [10]
  var anotherFrame = [8, 1]
  var score = game.scoreFrame(frame, nextFrame, anotherFrame)
  expect(score).toBe(28)
})

test('scores a game', function () {
  var frames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [4, 4]
  ] // 3      18      27     46     55     80    97     104     111     119
  var score = game.scoreGame(frames)
  expect(score).toBe(119)
})

test('scores a spare in the 10th frame', function () {
  var spareFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [6, 4, 8]
  ] // 3      18      27     46     55     80    97     104     111     129
  var spareScore = game.scoreGame(spareFrames)
  expect(spareScore).toBe(129)
})

test('scores a strike in the 10th frame', function () {
  var strikeFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [10, 4, 5]
  ] // 3      18      27     46     55     80    97     104     111      130
  var strikeScore = game.scoreGame(strikeFrames)
  expect(strikeScore).toBe(130)
})

test('scores a perfect game', function () {
  var perfectGame = [
    [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10,0], [10,0], [10, 0], [10, 0], [10, 10, 10]
  ] 
  var perfectScore = game.scoreGame(perfectGame)
  expect(perfectScore).toBe(300)
})


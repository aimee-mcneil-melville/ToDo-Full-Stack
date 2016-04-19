var test = require('tape')
var game = require('../game')

test('test setup working', function (t) {
  t.plan(1)
  t.equal('a', 'a')
})

test('scores a gutterball frame', function (t) {
  var frame = [0, 0]
  var score = game.scoreFrame(frame)
  t.equals(score, 0)
  t.end()
})

test('scores a normal frame', function (t) {
  var frame = [2, 3]
  var score = game.scoreFrame(frame)
  t.equals(score, 5)
  t.end()
})

test('scores a spare frame', function (t) {
  var frame = [2, 8]
  var nextFrame = [6, 3]
  var score = game.scoreFrame(frame, nextFrame)
  t.equals(score, 16)
  t.end()
})

test('scores a single strike frame', function (t) {
  var frame = [10]
  var nextFrame = [6, 3]
  var score = game.scoreFrame(frame, nextFrame)
  t.equals(score, 19)
  t.end()
})

test('scores a double strike frame', function (t) {
  var frame = [10]
  var nextFrame = [10]
  var anotherFrame = [8, 1]
  var score = game.scoreFrame(frame, nextFrame, anotherFrame)
  t.equals(score, 28)
  t.end()
})

test('scores a game', function (t) {
  var frames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [4, 4]
  ] // 3      18      27     46     55     80    97     104     111     119
  var score = game.scoreGame(frames)
  t.equals(score, 119)
  t.end()
})

test('scores a spare in the 10th frame', function (t) {
  var spareFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [6, 4, 8]
  ] // 3      18      27     46     55     80    97     104     111     129
  var spareScore = game.scoreGame(spareFrames)
  t.equals(spareScore, 129)
  t.end()
})

test('scores a strike in the 10th frame', function (t) {
  var strikeFrames = [
    [1, 2], [6, 4], [5, 4], [10], [7, 2], [10], [10], [5, 2], [7, 0], [10, 4, 5]
  ] // 3      18      27     46     55     80    97     104     111      130
  var strikeScore = game.scoreGame(strikeFrames)
  t.equals(strikeScore, 130)
  t.end()
})

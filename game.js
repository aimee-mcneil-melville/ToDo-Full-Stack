module.exports = {
  scoreFrame: scoreFrame,
  scoreGame: scoreGame
}

function scoreFrame (frame, nextFrame, anotherFrame, isTenth) {
  var score = frame[0] + frame[1]
  if (isTenth) {
    return calculateTenth(frame)
  }
  if (isStrike(frame)) {
    score = scoreStrikes(frame, nextFrame, anotherFrame)
  } else if (isSpare(frame)) {
    score += nextFrame[0]
  }
  return score
}

function scoreGame (frames) {
  var score = 0
  var isTenth = false
  for (var i = 0; i < frames.length; i++) {
    isTenth = i === frames.length - 1
    score += this.scoreFrame(frames[i], frames[i + 1], frames[i + 2], isTenth)
  }
  return score
}

function calculateTenth (frame) {
  var score = frame[0] + frame[1]
  if (isStrike(frame) || isSpare(frame)) {
    score += frame[2]
  }
  return score
}

function isStrike (frame) {
  return frame[0] === 10
}

function isSpare (frame) {
  return frame[0] + frame[1] === 10
}

function scoreStrikes (frame, nextFrame, anotherFrame) {
  var score = frame[0]
  if (nextFrame[0] === 10 && nextFrame.length !== 3) {
    score = score + nextFrame[0] + anotherFrame[0]
  } else {
    score = score + nextFrame[0] + nextFrame[1]
  }
  return score
}

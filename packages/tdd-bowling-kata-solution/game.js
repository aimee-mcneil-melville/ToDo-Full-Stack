const sumFrame = frame => frame.reduce((sum, n) => sum + n, 0)

const isStrike = frame => frame[0] === 10

const isSpare = frame => sumFrame(frame) === 10

const scoreStrike = (first, second, third) => {
  if (third && isStrike(second)) {
    return 20 + third[0]
  }

  return 10 + sumFrame(second.slice(0, 2))
}

const scoreSpare = (first, second) => 10 + second[0]

const scoreFrame = (first, second, third) => {
  if (second) {
    if (isStrike(first)) {
      return scoreStrike(first, second, third)
    }

    if (isSpare(first)) {
      return scoreSpare(first, second)
    }
  }

  return sumFrame(first)
}

// Bowling score is a classic use-case for Array.reduce: take a large,
// complex set of numbers and _reduce_ them into a single number.
const score = frames =>
  frames.reduce((total, frame, i) =>
    total + scoreFrame(frame, frames[i + 1], frames[i + 2]), 0)

// The next two functions aren't necessary to the solution, they just serve as examples.

// Here's another way to use the same scoring functions above, but using recursion.
const recursiveScore = frames => {
  const [ first, second, third ] = frames

  if (!second) {
    return scoreFrame(first)
  }

  return scoreFrame(first, second, third) + recursiveScore(frames.slice(1))
}

// Finally, here's an ordinary iterative solution.
const iterativeScore = frames => {
  let score = 0
  for (let i = 0; i < frames.length; i++) {
    score += scoreFrame(frames[i], frames[i + 1], frames[i + 2])
  }

  return score
}

module.exports = {
  isSpare,
  isStrike,
  iterativeScore,
  recursiveScore,
  score,
  scoreFrame,
  scoreSpare,
  scoreStrike,
  sumFrame
}

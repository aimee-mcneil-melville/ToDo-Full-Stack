module.exports = {
  examplePattern1,
  examplePattern2
}

function examplePattern1 (max) {
  let output = ''
  const rows = Array(max).fill(0)

  rows.forEach(item => {
    const cols = Array(max).fill(0)
    output += cols.join(' ') + '\n'
  })

  return output
}

function examplePattern2 (max) {
  let output = ''
  const rows = Array(max).fill(0)

  rows.forEach((item, i) => {
    const cols = Array(i + 1).fill(i)
    output += cols.join(' ') + '\n'
  })

  return output
}

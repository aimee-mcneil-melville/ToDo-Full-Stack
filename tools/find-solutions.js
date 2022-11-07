const util = require('util')
const exec = util.promisify(require('child_process').exec)
// const { existsSync } = require('fs')
const path = require('path/posix')

const challenges = require('./challenges-list')
const scriptName = path.basename(process.argv[1], '.js')

const main = async () => {
  process.chdir(path.join(__dirname, '..'))
  const solved = []

  for (const challenge of challenges) {
    try {
      console.log(`Looking for solutions for ${challenge}`)
      const { stdout } = await exec(
        `git ls-remote --heads git@github.com:dev-academy-challenges/${challenge} solution`
      )

      const lines = stdout.split('\n').filter((n) => n.includes('solution'))
      if (lines.length) {
        solved.push({ challenge, lines })
        console.log(`Found for ${challenge}: ${stdout}`)
      } else {
        console.log(`No solution found for challenge: ${challenge}`)
      }
    } catch (e) {
      console.error(`${scriptName} exec: ${e}`)
    }
  }

  console.log(solved)
}

main().catch((e) => {
  console.error(`${scriptName}: ${e}`)
  process.exitCode = 1
})

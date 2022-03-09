const util = require('util')
const exec = util.promisify(require('child_process').exec)

const challenges = require('./challenges-list')

const main = async () => {
  for (const challenge of challenges) {
    try {
      await exec(
        `git subtree add --prefix="packages/${challenge}" git@github.com:dev-academy-challenges/${challenge} main`
      )
    } catch (e) {
      console.error(`pull-challenges exec: ${e}`)
    }
  }
}

main().catch((e) => {
  console.error(`pull-challenges: ${e}`)
  process.exitCode = 1
})

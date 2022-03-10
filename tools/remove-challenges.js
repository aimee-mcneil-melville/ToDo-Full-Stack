const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs').promises
const path = require('path')

const challenges = require('./challenges-list')

const main = async () => {
  const packagesRoot = path.join(__dirname, '..', 'packages')
  const files = await fs.readdir(packagesRoot)
  for (const name of files) {
    if (challenges.includes(name)) {
      continue
    }
    try {
      await exec(`git rm -r "packages/${name}"`)
    } catch (e) {
      console.error(`remove-challenges exec: ${e}`)
    }
  }
}

main().catch((e) => {
  console.error(`remove-challenges: ${e}`)
  process.exitCode = 1
})

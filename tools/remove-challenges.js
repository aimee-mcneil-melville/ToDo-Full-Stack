const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs').promises
const { existsSync } = require('fs')
const path = require('path')

const challenges = require('./challenges-list')

const main = async () => {
  process.chdir(path.join(__dirname, '..'))

  const packagesRoot = path.join(__dirname, '..', 'packages')
  const files = await fs.readdir(packagesRoot)
  for (const name of files) {
    if (challenges.includes(name)) {
      continue
    }
    try {
      await exec(`git rm -r "packages/${name}"`)
      if (existsSync(`packages/${name}`)) {
        // git typically won't remove the directory
        await exec(`rm -r "packages/${name}"`)
      }
    } catch (e) {
      console.error(`remove-challenges exec: ${e}`)
    }
  }
}

main().catch((e) => {
  console.error(`remove-challenges: ${e}`)
  process.exitCode = 1
})

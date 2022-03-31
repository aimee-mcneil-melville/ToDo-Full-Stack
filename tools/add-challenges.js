const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { existsSync } = require('fs')
const path = require('path/posix')

const challenges = require('./challenges-list')

const main = async () => {
  process.chdir(path.join(__dirname, '..'))

  for (const challenge of challenges) {
    const packagePath = path.join(__dirname, '..', 'packages', challenge)
    try {
      if (existsSync(packagePath)) {
        console.log(`challenge ${challenge} exists at ${packagePath}`)
        await exec(
          `git subtree pull --prefix="packages/${challenge}" git@github.com:dev-academy-challenges/${challenge} main`
        )
        continue
      }

      console.log(
        `challenge ${challenge} doesn't exist at ${packagePath}, adding`
      )
      await exec(
        `git subtree add --prefix="packages/${challenge}" git@github.com:dev-academy-challenges/${challenge} main`
      )
    } catch (e) {
      console.error(`pull-challenges exec: ${e}`)
    }
  }
}

main().catch((e) => {
  const scriptName = path.basename(process.argv[1], '.js')
  console.error(`${scriptName}: ${e}`)
  process.exitCode = 1
})

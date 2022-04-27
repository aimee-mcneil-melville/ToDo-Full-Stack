const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { existsSync } = require('fs')
const path = require('path/posix')
const scriptName = path.basename(process.argv[1], '.js')

const challenges = [
  'ascii-art-reader',
  'broken-kaleidoscope',
  'charlottes-web-log',
  'conways',
  'enspiraled',
  'express-server',
  'knex-joins-stories',
  'knex-todo-cli',
  'memory',
  'pupparazzi',
  'react-paws-for-effect',
  'redux-minimal',
  'server-side-rendering',
  'sweet-as-beers',
  'tdd-bowling-kata',
  'worldwide-routing',
]

const main = async () => {
  process.chdir(path.join(__dirname, '..'))

  for (const challenge of challenges) {
    const packagePath = path.join(
      __dirname,
      '..',
      'packages',
      `${challenge}-solution`
    )
    try {
      if (existsSync(packagePath)) {
        console.log(`solution for ${challenge} exists at ${packagePath}`)
        await exec(
          `git subtree pull --prefix="packages/${challenge}-solution" git@github.com:dev-academy-challenges/${challenge} solution`
        )
        continue
      }

      console.log(
        `solution for ${challenge} doesn't exist at ${packagePath}, adding`
      )
      await exec(
        `git subtree add --prefix="packages/${challenge}-solution" git@github.com:dev-academy-challenges/${challenge} solution`
      )
    } catch (e) {
      console.error(`${scriptName} exec: ${e}`)
    }
  }
}

main().catch((e) => {
  console.error(`${scriptName}: ${e}`)
  process.exitCode = 1
})

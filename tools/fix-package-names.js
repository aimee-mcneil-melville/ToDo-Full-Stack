const fs = require('fs').promises
const { existsSync } = require('fs')
const path = require('path')

const challenges = require('./challenges-list')

const solutions = [
  'ascii-art-reader-solution',
  'broken-kaleidoscope-solution',
  'charlottes-web-log-solution',
  'conways-solution',
  'enspiraled-solution',
  'express-server-solution',
  'knex-joins-stories-solution',
  'knex-todo-cli-solution',
  'memory-solution',
  'pupparazzi-solution',
  'react-paws-for-effect-solution',
  'redux-minimal-solution',
  'server-side-rendering-solution',
  'sweet-as-beers-solution',
  'tdd-bowling-kata-solution',
  'worldwide-routing-solution',
]

const main = async () => {
  for (const challenge of [...challenges, ...solutions]) {
    try {
      const packagePath = path.join(
        __dirname,
        '..',
        'packages',
        challenge,
        'package.json'
      )

      if (!existsSync(packagePath)) {
        continue
      }

      const packageJson = await fs.readFile(packagePath, 'utf8')
      const packageObj = JSON.parse(packageJson)

      if (packageObj.name !== challenge) {
        console.log(
          `correcting ${challenge}'s package.name from ${packageObj.name}`
        )
        const newJson = JSON.stringify(
          { ...packageObj, name: challenge },
          null,
          2
        )
        await fs.writeFile(packagePath, newJson, 'utf8')
      }
    } catch (e) {
      console.error(`check-package-names: ${e}`)
    }
  }
}

main().catch((e) => {
  console.error(`check-package-names: ${e}`)
  process.exitCode = 1
})

const fs = require('fs').promises
const { existsSync } = require('fs')
const path = require('path')

const challenges = require('./challenges-list')

const main = async () => {
  for (const challenge of challenges) {
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

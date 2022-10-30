const fs = require('node:fs/promises')
const { existsSync } = require('node:fs')
const path = require('node:path')

const main = async () => {
  const challenges = await fs.readdir(path.join(__dirname, '..', 'packages'))

  for (const challenge of [...challenges]) {
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
      if (
        packageObj.devDependencies &&
        packageObj.devDependencies['eslint-config-eda'] &&
        packageObj.eslintConfig
      ) {
        delete packageObj.devDependencies['eslint-config-eda']
        packageObj.devDependencies['@devacademy/eslint-config'] = '^1.3.3'

        const eslint = packageObj.eslintConfig
        switch (eslint.extends) {
          case 'eda/core':
            eslint.extends = '@devacademy/eslint-config/core'
            break

          case 'eda':
            eslint.extends = '@devacademy'
            break

          case 'eda/react':
            eslint.extends = '@devacademy/eslint-config/react'
            break

          default:
            throw new Error(`Unexpected eslintConfig.extends ${eslint.extends}`)
        }

        const newJson = JSON.stringify(packageObj, null, 2) + '\n'
        await fs.writeFile(packagePath, newJson, 'utf8')
      }
    } catch (e) {
      console.error(`update-to-latest-eslint: ${e} in ${challenge}`)
    }
  }
}

main().catch((e) => {
  console.error(`update-to-latest-eslint: ${e}`)
  process.exitCode = 1
})

module.exports = async ({ package, path, versions, fix }) => {
  if (
    package.devDependencies &&
    package.devDependencies['eslint-config-eda'] &&
    package.eslintConfig
  ) {
    delete package.devDependencies['eslint-config-eda']
    package.devDependencies['@devacademy/eslint-config'] =
      versions['@devacademy/eslint-config']

    const eslint = package.eslintConfig
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

    process.stderr.write(`Outdated eslintConfig detected\n`)

    if (fix) {
      return package
    }

    throw new Error('eslint misconfigured')
  }
}

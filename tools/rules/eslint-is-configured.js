module.exports = async ({ package, path, versions, fix }) => {
  let changed = false
  if (
    package.devDependencies &&
    package.devDependencies['eslint-config-eda'] &&
    package.eslintConfig
  ) {
    changed = true
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
  }

  if (
    package.scripts &&
    package.scripts.lint &&
    package.scripts.lint !== 'eslint --ext .js,.jsx,.ts,.tsx .'
  ) {
    changed = true
    package.scripts.lint = 'eslint --ext .js,.jsx,.ts,.tsx .'
  }

  if (!changed) {
    return
  }
  // process.stderr.write(`Outdated eslintConfig detected\n`)

  if (fix) {
    return { result: package }
  }

  throw new Error('eslint misconfigured')
}

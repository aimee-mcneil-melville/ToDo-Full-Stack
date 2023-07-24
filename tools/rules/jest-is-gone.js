const ILLEGAL_DEPS = [
  'jest',
  '@types/jest',
  'eslint-plugin-jest'
]

module.exports = async ({ package: packageFile, versions, fix }) => {
  const { scripts, devDependencies } = packageFile

  for (const dep of ILLEGAL_DEPS) {
    if (devDependencies && dep in devDependencies) {
      throw new Error(`"${dep}" found in devDependencies`)
    }
  }

  if (scripts.test && scripts.test.match('jest')) {
    throw new Error(`Test script using jest`)
  }
}
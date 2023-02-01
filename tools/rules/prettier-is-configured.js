const FORMAT_SCRIPT = "prettier -w '**/*.{js,jsx,ts,tsx}'"

module.exports = async ({ package, fix }) => {
  let changed = false
  if (
    package.devDependencies &&
    package.devDependencies.prettier &&
    package.scripts?.format !== FORMAT_SCRIPT
  ) {
    changed = true
    package.scripts.format = FORMAT_SCRIPT
  }

  if (
    package?.devDependencies.prettier == null &&
    package?.scripts?.format != null
  ) {
    changed = true
    delete package.scripts.format
  }

  if (!changed) {
    return
  }

  if (fix) {
    return { result: package }
  }

  throw new Error('Prettier not configured')
}

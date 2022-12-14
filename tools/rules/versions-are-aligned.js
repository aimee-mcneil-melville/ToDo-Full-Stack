module.exports = async ({
  package: packageObj,
  versions: correctVersions,
  fix,
}) => {
  const { dependencies, devDependencies } = packageObj
  let modified = false

  for (const name in correctVersions) {
    const version = correctVersions[name]
    if (dependencies && dependencies[name] && dependencies[name] !== version) {
      dependencies[name] = version
      modified = true
    }

    if (
      devDependencies &&
      devDependencies[name] &&
      devDependencies[name] !== version
    ) {
      devDependencies[name] = version
      modified = true
    }
  }

  if (!modified) {
    return
  }

  if (fix) {
    process.stderr.write(`Updating dependencies in ${packageObj.name}\n`)
    return { result: packageObj }
  }

  if (modified === true) {
    throw new Error(`some dependencies in ${packageObj.name} did not match`)
  }
}

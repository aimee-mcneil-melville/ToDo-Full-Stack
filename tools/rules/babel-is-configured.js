const BABEL_PRESETS = [
  '@babel/preset-typescript',
  '@babel/preset-env',
  ['@babel/preset-react', { runtime: 'automatic' }],
]

module.exports = async ({ package: packageFile, versions, fix }) => {
  const { babel, dependencies, devDependencies, browserslist } = packageFile
  if (!babel && !('webpack' in { ...dependencies, ...devDependencies })) {
    return
  }

  let modified = false
  if (browserslist !== '> 2%, not dead') {
    packageFile.browserslist = '> 2%, not dead'
    // process.stderr.write(`browserslist should be: '> 2%, not dead'\n`)
    modified = true
  }

  if (
    !babel.presets ||
    JSON.stringify(babel.presets) !== JSON.stringify(BABEL_PRESETS)
  ) {
    babel.presets = BABEL_PRESETS
    // process.stderr.write(`babel presets misconfigured\n`)
    modified = true
  }

  if (!devDependencies['@babel/preset-typescript']) {
    // process.stderr.write(
    //   `@babel/preset-typescript missing from devDependencies\n`
    // )
    devDependencies['@babel/preset-typescript'] =
      versions['@babel/preset-typescript']
    modified = true
  }

  if (modified && !fix) {
    throw new Error(`babel is misconfigured`)
  }

  if (modified) {
    return [packageFile]
  }
}

module.exports = async ({ package: packageFile, path }) => {
  const { type } = packageFile
  if (type !== 'module') {
    throw new Error(`type should be "module"`)
  }
}

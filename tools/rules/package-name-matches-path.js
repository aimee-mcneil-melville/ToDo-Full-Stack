module.exports = async ({ package: packageFile, path }) => {
  const { name } = packageFile
  const dirname = path.split('/').at(-1)

  if (name !== dirname) {
    throw new Error(`package name doesn't match path`)
  }
}

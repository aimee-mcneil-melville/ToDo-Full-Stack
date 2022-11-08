module.exports = async ({ package: packageFile, path }) => {
  const { name } = packageFile
  const dirname = path.split('/').at(-1)

  if (name !== dirname) {
    process.stderr.write(
      `  > Name does not match path: ${name} !== ${dirname}\n`
    )

    throw new Error(`package name doesn't match path`)
  }
}

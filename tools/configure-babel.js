const FS = require('fs/promises')
const { existsSync } = require('fs')
const Path = require('path/posix')

const main = async () => {
  const dirs = await FS.readdir(Path.join(__dirname, '..', 'packages'))
  for (const dir of dirs) {
    const packagePath = Path.join(
      __dirname,
      '..',
      'packages',
      dir,
      'package.json'
    )
    if (!existsSync(packagePath)) {
      continue
    }

    try {
      const json = await FS.readFile(packagePath, 'utf8')
      const packageObj = JSON.parse(json)
      const { devDependencies, babel } = packageObj
      let modified = false
      if (!babel || !('webpack' in devDependencies)) {
        continue
      }

      modified = true
      packageObj.babel = {
        presets: [
          '@babel/preset-typescript',
          '@babel/preset-env',
          '@babel/preset-react',
        ],
      }

      packageObj.browserslist = '> 2%, not dead'
      devDependencies['@babel/preset-typescript'] = '^7.17.12'

      if (modified) {
        console.log(`updating ${packagePath}`)
        const output = `${JSON.stringify(packageObj, null, 2)}\n`
        await FS.writeFile(packagePath, output, 'utf-8')
      }
    } catch (err) {
      console.error({ dir, err })
    }
  }
}

main().catch((err) => {
  process.exitCode = 1
  console.error(`align failed: ${err}`)
})

const FS = require('fs').promises
const Path = require('path')

// TODO:  mostly we don't need @testing-library/react

const correctVersions = {
  '@babel/core': '^7.15.6',
  '@babel/plugin-proposal-class-properties': '^7.14.5',
  '@babel/plugin-proposal-object-rest-spread': '^7.15.6',
  '@babel/plugin-transform-regenerator': '^7.13.15',
  '@babel/plugin-transform-runtime': '^7.15.0',
  '@babel/preset-env': '^7.15.6',
  '@babel/preset-react': '^7.14.5',
  '@babel/register': '^7.13.14',
  '@testing-library/jest-dom': '^5.14.1',
  '@testing-library/user-event': '^12.7.1',
  'babel-jest': '^26.6.3',
  'babel-loader': '^8.2.2',
  cheerio: '^1.0.0-rc10',
  'css-loader': '^6.3.0',
  dotenv: '^10.0.0',
  eslint: '^8.10.0',
  'eslint-config-eda': '^1.0.0',
  'eslint-plugin-jest': '^26.1.1',
  express: '^4.17.2',
  'express-handlebars': '^6.0.2',
  jest: '^27.5.1',
  knex: '^1.0.3',
  'mini-css-extract-plugin': '^2.3.0',
  nodemon: '^2.0.15',
  pg: '^8.7.1',
  'react-redux': '^7.2.5',
  redux: '^4.1.1',
  'regenerator-runtime': '^0.13.7',
  'style-loader': '^3.3.0',
  'styled-components': '^5.3.1',
  superagent: '^7.1.1',
  supertest: '^6.2.2',
  webpack: '^5.69.1',
  'webpack-cli': '^4.9.2',
}

const main = async () => {
  throw new Error(`The time has not yet come to run this totally safe script`)

  const dirs = await FS.readdir(Path.join(__dirname, 'packages'))
  for (const dir of dirs) {
    const packagePath = Path.join(__dirname, 'packages', dir, 'package.json')
    try {
      const json = await FS.readFile(packagePath, 'utf8')
      const packageObj = JSON.parse(json)
      for (const name in correctVersions) {
        const version = correctVersions[name]
        if (packageObj.dependencies && packageObj.dependencies[name]) {
          packageObj.dependencies[name] = version
        }

        if (packageObj.devDependencies && packageObj.devDependencies[name]) {
          packageObj.devDependencies[name] = version
        }
      }

      const output = JSON.stringify(packageObj, null, 2)
      await FS.writeFile(packagePath, output, 'utf-8')
    } catch (err) {
      console.error({ dir, err })
    }
  }
}

main().catch((err) => {
  process.exitCode = 1
  console.error(`align failed: ${err}`)
})

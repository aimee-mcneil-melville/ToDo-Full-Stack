const EXPECTED_SCRIPTS = {
  start: 'ts-node server/index.ts',
  'build:client': 'NODE_ENV=production webpack',
  'build:server': 'knex --knexfile ./server/db/knexfile.js migrate:latest',
  dev: 'run-p dev:client dev:server',
  'dev:client': 'webpack --watch',
  'dev:server': 'nodemon server/index.ts',
  lint: 'eslint --ext .js,.jsx,.ts,.tsx',
  test: 'jest',
  knex: 'knex --knexfile ./server/db/knexfile.js',
}

module.exports = async ({ package: packageFile, versions, fix }) => {
  const { scripts, dependencies, devDependencies } = packageFile
  const deps = { ...dependencies, ...devDependencies }
  if (!deps['react'] || !deps['express']) {
    return
  }
}

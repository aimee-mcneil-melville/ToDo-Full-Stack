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

  // Every repo should have both these scripts
  if ('jest' in deps) {
    scripts.test = 'jest --watchAll'
  }

  if ('eslint' in deps) {
    scripts.lint = 'eslint --ext .js,.jsx,.ts,.tsx .'
  }

  // Express and Express with Knex without TS
  if ('express' in deps && !('typescript' in deps)) {
    scripts.start = 'node index'
    scripts.dev = 'nodemon index'
    devDependencies.nodemon = '^2.0.15'
    if ('knex' in deps) {
      scripts.knex = 'knex --knexfile ./server/db/knexfile.js'
    }
  }

  if ('knex' in deps && !('express' in deps)) {
    scripts.knex = 'knex'
    scripts.test = 'echo "Error: no test specified" && exit 1'
  }

  return packageFile
}

// I am going to attempt to have a script working for both Express and Knex projects

// Every Repo
// "test": "jest --watchAll",
// "lint": "eslint --ext .js,.jsx,.ts,.tsx .",

// EXPRESS
// express-server
// "start": "node index",

// server-side-rendering & pupparazzi
// "start": "node index",
// "dev": "nodemon index",

// KNEX
// knex-todo-cli
// "knex": "knex",

// todo-full-stack, knex-join-stories, dreamfest, boilerplate-express-api & boilerplate-fullstack
// "knex": "knex --knexfile ./server/db/knexfile.js",

// React
// react-paws-for-effect
// "start": "ts-node server/index.ts",
// "build": "npm run webpack --mode production",

// "dev": "run-p dev:server dev:client",
// "dev:client": "npm run webpack -- --watch",
// "dev:server": "nodemon server/index.ts",
// "webpack": "webpack --config ./client/webpack.config.js",

// charlottes-web-log
// "start": "run-p webpack build",
// "build": "ts-node server/index.ts",

// same as lines 48-51

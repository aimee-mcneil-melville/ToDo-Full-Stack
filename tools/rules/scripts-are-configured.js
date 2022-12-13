// const UNIMPLEMENTATED_SCRIPTS = {
//   'build:client': 'NODE_ENV=production webpack',
//   'build:server': 'knex --knexfile ./server/db/knexfile.js migrate:latest',
//   'db-reset': 'run-s db:*',
//   'db:delete': 'rm server/db/dev.sqlite3',
//   'db:migrate': 'npm run knex migrate:latest',
//   'db:seed': 'npm run knex seed:run',
// }

const COMMON_SCRIPTS = {
  test: 'jest --watchAll',
  lint: 'eslint --ext .js,.jsx,.ts,.tsx .',
  noTest: 'echo "Error: no test specified" && exit 1',
}

const JS_SCRIPTS = {
  start: 'node server/index',
  dev: 'nodemon server/index',
  knex: 'knex --knexfile ./server/db/knexfile.js',
}

const TS_SCRIPTS = {
  start: 'ts-node server/index.ts',
  // build: 'npm run webpack --mode production',
  dev: 'run-p dev:server dev:client',
  'dev:client': 'npm run webpack -- --watch',
  'dev:server': 'nodemon server/index.ts',
  webpack: 'webpack --config ./client/webpack.config.js',
}

module.exports = async ({ package: packageFile, versions, fix }) => {
  const { scripts, dependencies, devDependencies } = packageFile
  const deps = { ...dependencies, ...devDependencies }

  let modified = false
  let errors = ''
  const errorMessage = `Scripts are misconfigured: \n ${errors}`

  const message = (scriptName) =>
    (errors += `${scriptName} script in: ${packageFile.name} is incorrect, \n`)

  // Every repo should have both these scripts
  if ('jest' in deps) {
    if (scripts.test != COMMON_SCRIPTS.test) {
      scripts.test = COMMON_SCRIPTS.test
      message('test')
      modified = true
    }
  }

  if ('eslint' in deps) {
    if (scripts.lint != COMMON_SCRIPTS.lint) {
      scripts.lint = COMMON_SCRIPTS.lint
      message('lint')
      modified = true
    }
  }

  // Express and Express and Knex without TS
  if ('express' in deps && !('typescript' in deps)) {
    if (scripts.start != JS_SCRIPTS.start) {
      scripts.start = JS_SCRIPTS.start
      message('start')
      modified = true
    }
    if (scripts.dev != JS_SCRIPTS.dev) {
      scripts.dev = JS_SCRIPTS.dev
      message('dev')
      modified = true
    }

    devDependencies.nodemon = versions.nodemon // maybe we don't need this?

    if ('knex' in deps) {
      if (scripts.knex != JS_SCRIPTS.knex) {
        scripts.knex = JS_SCRIPTS.knex
        message('knex')
        modified = true
      }
    }
  }

  if ('knex' in deps && !('express' in deps)) {
    if (scripts.knex != 'knex') {
      scripts.knex = 'knex'
      message('knex')
      modified = true
    }
    if ('jest' in deps) {
      if (scripts.test != COMMON_SCRIPTS.noTest) {
        scripts.test = COMMON_SCRIPTS.noTest
        message('test')
        modified = true
      }
    }
  }

  // TS scripts
  if ('express' in deps && 'typescript' in deps) {
    if (scripts.start != TS_SCRIPTS.start) {
      scripts.start = TS_SCRIPTS.start
      message('start')
      modified = true
    }
    if ('webpack' in deps) {
      if (scripts.webpack != TS_SCRIPTS.webpack) {
        scripts.webpack = TS_SCRIPTS.webpack
        message('webpack')
        modified = true
      }
      if (scripts.dev != TS_SCRIPTS.dev) {
        scripts.dev = TS_SCRIPTS.dev
        message('dev')
        modified = true
      }
      // Does this incorrect naming exist
      if (scripts['watch:client']) {
        delete scripts['watch:client']
        scripts['dev:client'] = TS_SCRIPTS['dev:client']
        message('dev:client')
        modified = true
      }
      if (scripts['dev:client'] != TS_SCRIPTS['dev:client']) {
        scripts['dev:client'] = TS_SCRIPTS['dev:client']
        message('dev:client')
        modified = true
      }
      // Does this incorrect naming exist
      if (scripts['watch:server']) {
        delete scripts['watch:server']
        scripts['dev:server'] = TS_SCRIPTS['dev:server']
        message('dev:server')
        modified = true
      }
      if (scripts['dev:server'] != TS_SCRIPTS['dev:server']) {
        scripts['dev:server'] = TS_SCRIPTS['dev:server']
        message('dev:server')
        modified = true
      }
    }
  }

  // Exit code
  if (modified && !fix) {
    throw new Error(errorMessage)
  }

  if (modified) {
    return packageFile
  }
}

// REFERENCES

// React
// DONE react-paws-for-effect
// "start": "ts-node server/index.ts",
// "build": "npm run webpack --mode production",
// "dev": "run-p dev:server dev:client",
// "dev:client": "npm run webpack -- --watch",
// "dev:server": "nodemon server/index.ts",
// "webpack": "webpack --config ./client/webpack.config.js",

// => TODO DB Knex Scripts for Production

// "db-reset": "run-s db:*",
// "db:delete": "rm server/db/dev.sqlite3",
// "db:migrate": "npm run knex migrate:latest",
// "db:seed": "npm run knex seed:run",

// I am going to attempt to have a script working for both Express and Knex projects

// DONE Every Repo
// "test": "jest --watchAll",
// "lint": "eslint --ext .js,.jsx,.ts,.tsx .",

// DONE EXPRESS
// express-server
// "start": "node index",

// DONE server-side-rendering & pupparazzi
// "start": "node index",
// "dev": "nodemon index",

// DONE KNEX
// knex-todo-cli
// "knex": "knex",

// DONE todo-full-stack, knex-join-stories, dreamfest, boilerplate-express-api & boilerplate-fullstack
// "knex": "knex --knexfile ./server/db/knexfile.js",

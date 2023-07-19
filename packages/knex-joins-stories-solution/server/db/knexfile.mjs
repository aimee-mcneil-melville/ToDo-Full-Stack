import * as Path from 'node:path/posix'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const defaults = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    loadExtensions: ['.mjs'],
    directory: Path.join(__dirname, 'migrations'),
  },
  seeds: {
    loadExtensions: ['.mjs'],
    directory: Path.join(__dirname, 'seeds'),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },
}

export default {
  development: {
    ...defaults,
    connection: {
      filename: Path.join(__dirname, 'dev.sqlite3'),
    },
  },

  test: {
    ...defaults,
    connection: {
      filename: ':memory:',
    },
  },

  production: {
    ...defaults,
    connection: {
      filename: '/app/storage/prod.sqlite3',
    },
  },
}

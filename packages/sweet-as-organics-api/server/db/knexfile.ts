import path from 'path'
import { Knex } from 'knex'

const config: Record<string, Knex.Config> = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.join(__dirname, 'dev.sqlite3'),
    },
    pool: {
      afterCreate: (conn: any, cb: any) =>
        conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '/app/storage/prod.sqlite3',
    },
    pool: {
      afterCreate: (conn: any, cb: any) =>
        conn.run('PRAGMA foreign_keys = ON', cb),
    },
  },
}

export default config

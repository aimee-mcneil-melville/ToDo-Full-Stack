import * as Path from 'node:path'
import * as URL from 'node:url'
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: Path.resolve(__dirname, './dev.sqlite3'),
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  },
}

export default config

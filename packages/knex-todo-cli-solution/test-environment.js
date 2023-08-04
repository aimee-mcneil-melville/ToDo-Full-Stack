import getDbConn from 'knex'

import config from './knexfile.js'

export function getTestDb() {
  return getDbConn(config.test)
}

export async function initialise(db) {
  await db.migrate.latest()
  await db.seed.run()
}
export function cleanup(db) {
  return db.destroy()
}

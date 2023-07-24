/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.alterTable('wombles', (t) => {
    t.integer('rubbish_id').references('rubbish.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.alterTable('wombles', (t) => {
    t.dropColumn('rubbish_id')
  })
}

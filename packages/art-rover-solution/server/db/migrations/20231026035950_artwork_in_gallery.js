/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable('artworks', (table) => {
    table.integer('gallery_id').references('galleries.id').onDelete('SET NULL')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable('artworks', (table) => {
    table.dropColumn('gallery_id')
  })
}

import connection from './connection.js'

export async function wombles() {
  return connection('wombles').select('*')
}

export async function getWomble(id) {
  return connection('wombles')
    .join('traits', 'wombles.trait_id', 'traits.id')
    .join('rubbish', 'wombles.rubbish_id', 'rubbish.id')
    .select(
      '*',
      'wombles.name as name',
      'traits.description as trait_description',
      'rubbish.name as rubbish_name'
    )
    .where('wombles.id', id)
    .first()
}

export const GET_GARDEN_LIST = 'GET_GARDEN_LIST'

export function getGardenList (allGarden) {
  return {
    type: GET_GARDEN_LIST,
    allGarden
  }
}

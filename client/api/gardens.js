import requestor from './consume'

export function getGardens (consume = requestor) {
  return consume('/gardens')
    .then(res => {
      return res.body.gardens
    })
}

export function getUserGarden (gardenId, consume = requestor) {
  return consume(`/gardens/${gardenId}`)
    .then(res => {
      return res.body
    })
}


export function getEvents (gardenId, consume = requestor) {
    return consume(`/gardens/${gardenId}`)
      .then(res => {
        return res.body
        console.log(hi)
      })
  }

  export function addEvent (gardenId, consume = requestor) {
    return consume(`/gardens/${gardenId}`)
      .then(res => {
        return res.body
      })
  }
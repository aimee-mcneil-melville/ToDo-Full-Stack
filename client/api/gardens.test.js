import { getGardens, getGardenById } from './gardens'

describe('getGardens', () => {
  it('returns gardens from res body', () => {
    function consume () {
      return Promise.resolve({
        body: {
          gardens: [{ gardenId: 1 }, { gardenId: 2 }]
        }
      })
    }

    return getGardens(consume)
      .then((gardens) => {
        expect(gardens).toHaveLength(2)
        return null
      })
  })
})

describe('getGardenById', () => {
  it('returns res body', () => {
    expect.assertions(2)
    function consume (path) {
      expect(path).toMatch('2')
      return Promise.resolve({ body: { gardenId: 2 } })
    }

    return getGardenById(2, consume)
      .then((garden) => {
        expect(garden.gardenId).toBe(2)
        return null
      })
  })
})

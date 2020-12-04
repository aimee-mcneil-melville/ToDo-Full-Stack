import { getGardens, getGardenById } from './gardens'

test('getGardens returns gardens from res body', () => {
  const consume = () => Promise.resolve({
    body: {
      gardens: [{ gardenId: 1 }, { gardenId: 2 }]
    }
  })

  return getGardens(consume)
    .then((gardens) => {
      expect(gardens).toHaveLength(2)
      return null
    })
})

test('getGardenById returns res body', () => {
  expect.assertions(2)
  const consume = (path) => {
    expect(path).toMatch('2')
    return Promise.resolve({ body: { gardenId: 2 } })
  }

  return getGardenById(2, consume)
    .then((garden) => {
      expect(garden.gardenId).toBe(2)
      return null
    })
})

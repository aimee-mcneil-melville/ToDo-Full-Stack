import { removeEmptySpots } from "../../files/2-arrays"

describe('removeEmptySpots (UNION)', () => {
  it('returns a new array', () => {
    const arr = ['hello', null, 'world']
    const actual = removeEmptySpots(arr)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).not.toBe(arr)
  })

  it('returns an array with no empty spots', () => {
    const arr = ['hello', null, 'world']
    const actual = removeEmptySpots(arr)

    expect(actual.length).toBe(2)
    expect(actual).toEqual(['hello', 'world'])

    const arr2 = [null, null, null, null, null, null, null]
    const actual2 = removeEmptySpots(arr2)

    expect(actual2.length).toBe(0)
    expect(actual2).toEqual([])
  })
})

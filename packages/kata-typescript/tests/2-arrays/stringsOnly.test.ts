import { stringsOnly } from '../../functions/2-arrays'

describe('stringsOnly (UNION)', () => {
  it('returns a new array', () => {
    const arr = ['hello', null, 'world']
    const actual = stringsOnly(arr)

    expect(Array.isArray(actual)).toBe(true)
    expect(actual).not.toBe(arr)
  })

  it('returns an array with no empty spots', () => {
    const arr = ['hello', null, 'world']
    const actual = stringsOnly(arr)

    expect(actual).toHaveLength(2)
    expect(actual).toEqual(['hello', 'world'])

    const arr2 = [null, null, null, null, null, null, null]
    const actual2 = stringsOnly(arr2)

    expect(actual2).toHaveLength(0)
    expect(actual2).toEqual([])
  })
})

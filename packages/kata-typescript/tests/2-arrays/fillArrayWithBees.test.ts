import { fillArrayWithBees } from "../../functions/2-arrays"

describe('fillArrayWithBees', () => {
  it('returns an array of the correct length', () => {
    const actual = fillArrayWithBees(1)
    expect(Array.isArray(actual)).toBe(true)
    expect(actual.length).toBe(1)

    expect(fillArrayWithBees(5).length).toBe(5)
    expect(fillArrayWithBees(10).length).toBe(10)
  })

  it('returns an array of strings', () => {
    const arr = fillArrayWithBees(2)
    expect(typeof arr[0]).toBe('string')
    expect(typeof arr[1]).toBe('string')
  })

  it('returns an array of "buzz" strings', () => {
    const arr = fillArrayWithBees(3)
    expect(arr).toEqual(['buzz', 'buzz', 'buzz'])
  })
})

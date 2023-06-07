import { removeFirstItem } from '../../../functions/7-stretch-generics'

describe('removeFirstItem', () => {
  it('should return the first item', () => {
    expect(removeFirstItem([1, 2, 3])).toBe(1)
    expect(removeFirstItem(['hello', 'world'])).toBe('hello')
  })

  it('should alter the array so the item is no longer present', () => {
    const arr = [1, 2, 3]
    expect(removeFirstItem(arr)).toBe(1)
    expect(arr).toEqual([2, 3])
  })

  it('should return undefined if the array is empty', () => {
    expect(removeFirstItem([])).toBeUndefined()
  })
})

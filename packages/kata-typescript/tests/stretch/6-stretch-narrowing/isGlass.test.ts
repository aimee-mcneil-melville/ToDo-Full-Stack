import { isGlass } from '../../../functions/6-stretch-narrowing'

describe('isGlass', () => {
  it('should return true if the item is glass', () => {
    const item = {
      colour: 'green',
      melt: jest.fn(),
    }

    expect(isGlass(item)).toBe(true)
  })

  it('should return false if the item is not glass', () => {
    const item = {
      type: 'aluminum',
      magnetize: jest.fn(),
    }

    expect(isGlass(item)).toBe(false)
  })
})

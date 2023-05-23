import { sortRecycling, Trash } from '../../../functions/6-stretch-narrowing'

describe('sortRecycling', () => {
  it('should return an array', () => {
    const actual = sortRecycling([])
    expect(Array.isArray(actual)).toBe(true)
  })

  it('should remove all the rubbish from the array', () => {
    const trash = [
      'rubbish',
      { colour: 'green', melt: jest.fn() },
      'rubbish',
      { density: 'light', compost: jest.fn() },
      { type: 'aluminum', magnetize: jest.fn() },
      'rubbish',
      { colour: 'brown', compost: jest.fn() },
    ] as Trash[]

    const actual = sortRecycling(trash)

    expect(actual).not.toContain('rubbish')
  })
})

import { describe, it, expect, vi } from 'vitest'
import { sortRecycling, Trash } from '../../../functions/6-stretch-narrowing'

describe('sortRecycling', () => {
  it('should return an array', () => {
    const actual = sortRecycling([])
    expect(Array.isArray(actual)).toBe(true)
  })

  it('should remove all the rubbish from the array', () => {
    const trash = [
      'rubbish',
      { colour: 'green', melt: vi.fn() },
      'rubbish',
      { density: 'light', compost: vi.fn() },
      { type: 'aluminum', magnetize: vi.fn() },
      'rubbish',
      { colour: 'brown', compost: vi.fn() },
    ] as Trash[]

    const actual = sortRecycling(trash)

    expect(actual).not.toContain('rubbish')
  })
})

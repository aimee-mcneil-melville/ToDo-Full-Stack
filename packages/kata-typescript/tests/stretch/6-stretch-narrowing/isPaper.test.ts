import { describe, it, expect, vi } from 'vitest'
import { isPaper } from '../../../functions/6-stretch-narrowing'

describe('isPaper', () => {
  it('should return true if the item is paper', () => {
    const item = {
      density: 'heavy',
      compost: vi.fn(),
    }

    expect(isPaper(item)).toBe(true)
  })

  it('should return false if the item is not paper', () => {
    const item = {
      colour: 'green',
      melt: vi.fn(),
    }

    expect(isPaper(item)).toBe(false)
  })
})

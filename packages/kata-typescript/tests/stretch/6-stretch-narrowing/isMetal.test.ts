import { describe, it, expect, vi } from 'vitest'
import { isMetal } from '../../../functions/6-stretch-narrowing'

describe('isMetal', () => {
  it('should return true if the item is metal', () => {
    const item = {
      type: 'aluminum',
      magnetize: vi.fn(),
    }

    expect(isMetal(item)).toBe(true)
  })

  it('should return false if the item is not metal', () => {
    const item = {
      density: 'heavy',
      compost: vi.fn(),
    }

    expect(isMetal(item)).toBe(false)
  })
})

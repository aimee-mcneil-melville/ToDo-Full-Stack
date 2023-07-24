import { describe, it, expect, vi } from 'vitest'
import { isRecycling } from '../../../functions/6-stretch-narrowing'

describe('isRecycling', () => {
  it('should return true if the item is glass', () => {
    const item = {
      colour: 'green',
      melt: vi.fn(),
    }

    expect(isRecycling(item)).toBe(true)
  })

  it('should return true if the item is paper', () => {
    const item = {
      density: 'heavy',
      compost: vi.fn(),
    }

    expect(isRecycling(item)).toBe(true)
  })

  it('should return true if the item is metal', () => {
    const item = {
      type: 'aluminum',
      magnetize: vi.fn(),
    }

    expect(isRecycling(item)).toBe(true)
  })

  it('should return false if the item is rubbish', () => {
    const item = 'rubbish'

    expect(isRecycling(item)).toBe(false)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { callsFunction } from '../../../functions/4-stretch-function-type'

describe('callsFunction', () => {
  it('calls the function', () => {
    const spy = vi.fn()
    callsFunction(spy)
    expect(spy).toHaveBeenCalled()
  })
})

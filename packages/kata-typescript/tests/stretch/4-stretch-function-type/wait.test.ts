import { describe, it, expect, vi } from 'vitest'
import { wait } from '../../../functions/4-stretch-function-type'

describe('wait (FUNC PARAMETER)', () => {
  it('should call the callback after the specified time', (done) => {
    const callback = vi.fn()

    wait(100, callback)

    expect(callback).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(callback).toHaveBeenCalled()
      done()
    }, 101)
  })
})

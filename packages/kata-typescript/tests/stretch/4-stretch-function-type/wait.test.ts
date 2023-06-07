import { wait } from '../../../functions/4-stretch-function-type'

describe('wait (FUNC PARAMETER)', () => {
  // eslint-disable-next-line jest/no-done-callback
  it('should call the callback after the specified time', (done) => {
    const callback = jest.fn()

    wait(100, callback)

    expect(callback).not.toHaveBeenCalled()
    setTimeout(() => {
      expect(callback).toHaveBeenCalled()
      done()
    }, 101)
  })
})

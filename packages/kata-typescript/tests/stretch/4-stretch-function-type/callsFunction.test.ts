import { callsFunction } from '../../../functions/4-stretch-function-type'

describe('callsFunction', () => {
  it('calls the function', () => {
    const spy = jest.fn()
    callsFunction(spy)
    expect(spy).toHaveBeenCalled()
  })
})

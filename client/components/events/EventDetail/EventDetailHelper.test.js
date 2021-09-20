import { getEvent } from './EventDetailHelper'
import { showError } from '../../../actions/error'

jest.mock('../../../store')
jest.mock('../../../actions/error')

describe('testing for getEvent', () => {
  it('expect to return the data in the correct shape', () => {
    const requestor = jest.fn().mockImplementation((path) => {
      return Promise.resolve({
        body: {
          title: 'test data',
          gardenName: 'test garden',
          gardenAddress: 'test address',
          date: 'test date',
          volunteersNeeded: 'test volunteers needed',
          description: 'test description'
        }
      })
    })
    return getEvent(1, requestor).then(data => {
      expect(data).toEqual({
        title: 'test data',
        gardenName: 'test garden',
        gardenAddress: 'test address',
        date: 'test date',
        volunteersNeeded: 'test volunteers needed',
        description: 'test description'
      })
      return null
    })
  })

  it('should call the function dispatch show error when the promise fails', async () => {
    expect.assertions(1)
    const requestor = jest.fn().mockImplementation((path) => {
      return Promise.reject(new Error('This is a test error'))
    })
    await getEvent(1, requestor)
    expect(showError).toHaveBeenCalled()
  })
})

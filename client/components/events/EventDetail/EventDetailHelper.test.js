import { getEvent } from './EventDetailHelper'
import { SET_WAITING, CLEAR_WAITING } from '../../../actions/waiting'
import { dispatch } from '../../../store'

jest.mock('../../../store')

describe('testing for getEvent', () => {
  it('expect to return the data in the correct shape', () => {
    const requestor = jest.mockImplementation((path) => {
      return Promise.resolve({
        body: {
          title
        }
      })
    })
  })
})

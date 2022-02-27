import { dispatch } from '../../../store'
import { addVolunteer } from './AddVolunteerFormHelper'
import { showError } from '../../../actions/error'

jest.mock('../../../store')
jest.mock('../../../actions/error')

describe('Testing AddVolunteerFormHelper', () => {
  it('Should dispatch clear waiting and call addExtraVolunteer', async () => {
    expect.assertions(5)
    const mockVolunteer = {
      id: 1,
      firstName: 'tester',
      lastName: 'tested',
    }
    const mockAdd = jest.fn((newVolunteer) => {
      expect(newVolunteer).toEqual({
        id: 1,
        firstName: 'tester',
        lastName: 'tested',
        extraVolId: 77,
      })
    })
    const mockConsume = jest.fn((path, method, volunteer) => {
      expect(path).toBe('/volunteers/extras')
      expect(method).toBe('post')
      expect(volunteer).toBe(mockVolunteer)
      return Promise.resolve({
        body: {
          extraVolId: 77,
        },
      })
    })

    return addVolunteer(mockVolunteer, mockAdd, mockConsume).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2)
      return null
    })
  })

  it('Should dispatch error action when api fails', async () => {
    expect.assertions(1)
    const mockVolunteer = {
      id: 66,
      firstName: 'I fail',
      lastName: 'Everything',
    }
    const mockAdd = jest.fn()
    const mockConsume = jest.fn(() => {
      return Promise.reject(new Error('Unable to add extra volunteer'))
    })
    await addVolunteer(mockVolunteer, mockAdd, mockConsume)
    expect(showError).toHaveBeenCalled()
  })
})

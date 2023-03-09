import { getNextTrafficLightColour } from '../../files/1-types'

describe('getNextTrafficLightColour (UNION PARAMS & RETURN)', () => {
  it('returns the next color in the sequence', () => {
    expect(getNextTrafficLightColour('green')).toBe('yellow')
    expect(getNextTrafficLightColour('yellow')).toBe('red')
    expect(getNextTrafficLightColour('red')).toBe('green')
  })
})

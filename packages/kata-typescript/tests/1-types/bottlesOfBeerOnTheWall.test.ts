import { describe, it, expect } from 'vitest'
import { bottlesOfBeerOnTheWall } from '../../functions/1-types'

describe('bottlesOfBeerOnTheWall', () => {
  it('returns a string', () => {
    expect(typeof bottlesOfBeerOnTheWall(1)).toBe('string')
  })

  it('return contains the number of bottles of beer on the wall', () => {
    expect(bottlesOfBeerOnTheWall(99)).toBe('99 bottles of beer on the wall')
    expect(bottlesOfBeerOnTheWall(21)).toBe('21 bottles of beer on the wall')
  })

  it('returns "No more bottles of beer on the wall" when the number of bottles is 0', () => {
    expect(bottlesOfBeerOnTheWall(0)).toBe(
      'No more bottles of beer on the wall'
    )
  })
})

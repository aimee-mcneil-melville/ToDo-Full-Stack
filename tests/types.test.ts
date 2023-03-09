import * as types from '../files/1-types'

describe('getGreeting', () => {
  it('returns a string', () => {
    expect(typeof types.getGreeting('name')).toBe('string')
  })

  it('return contains "Hello " and the contents of `name`', () => {
    expect(types.getGreeting('name')).toBe('Hello name')
    expect(types.getGreeting('Human')).toBe('Hello Human')
  })
})

describe('getFullName', () => {
  it('returns a string', () => {
    expect(typeof types.getFullName('first', 'last')).toBe('string')
  })

  it('returns a correctly formatted first and last name', () => {
    expect(types.getFullName('first', 'last')).toBe('first last')
    expect(types.getFullName('Bruce', 'Wayne')).toBe('Bruce Wayne')
  })
})

describe('addNumbers', () => {
  it('returns a number', () => {
    expect(typeof types.addNumbers(1, 2)).toBe('number')
  })

  it('returns the sum of the two parameters', () => {
    expect(types.addNumbers(1, 2)).toBe(3)
    expect(types.addNumbers(5, 5)).toBe(10)
  })
})

describe('bottlesOfBeerOnTheWall', () => {
  it('returns a string', () => {
    expect(typeof types.bottlesOfBeerOnTheWall(1)).toBe('string')
  })

  it('return contains the number of bottles of beer on the wall', () => {
    expect(types.bottlesOfBeerOnTheWall(99)).toBe('99 bottles of beer on the wall')
    expect(types.bottlesOfBeerOnTheWall(21)).toBe('21 bottles of beer on the wall')
  })

  it('returns "No more bottles of beer on the wall" when the number of bottles is 0', () => {
    expect(types.bottlesOfBeerOnTheWall(0)).toBe('No more bottles of beer on the wall')
  })
})

describe('printGreeting', () => {
  const spy = jest.spyOn(console, 'log').mockImplementation((str) => {})

  it('does not return a value', () => {
    expect(types.printGreeting('name')).toBeUndefined()
  })

  it('should console.log a string containing "Hello" and the contents of `name`', () => {
    types.printGreeting('World')
    expect(spy).toHaveBeenCalledWith('Hello World')
  })
})

describe('sumFrame (OPTIONAL PARAMETER)', () => {
  it('returns a number', () => {
    expect(typeof types.sumFrame(1, 2)).toBe('number')
    expect(typeof types.sumFrame(1, 2, 3)).toBe('number')
  })

  it('returns the sum of the two parameters', () => {
    expect(types.sumFrame(1, 2)).toBe(3)
    expect(types.sumFrame(5, 5)).toBe(10)
  })

  it('returns the sum of the three parameters', () => {
    expect(types.sumFrame(1, 2, 3)).toBe(6)
    expect(types.sumFrame(5, 5, 5)).toBe(15)
  })
})

describe('greetFullName (OPTIONAL PARAMETER)', () => {
  it('returns a string', () => {
    expect(typeof types.greetFullName('first', 'last')).toBe('string')
  })

  it('return contains the full name (no middle name)', () => {
    expect(types.greetFullName('first', 'last')).toBe('Hello first last')
    expect(types.greetFullName('Bruce', 'Wayne')).toBe('Hello Bruce Wayne')
  })

  it('return contains the full name (including middle)', () => {
    expect(types.greetFullName('first', 'last', 'middle')).toBe('Hello first middle last')
    expect(types.greetFullName('Bruce', 'Wayne', 'Thomas')).toBe('Hello Bruce Thomas Wayne')
  })
})

describe('addNumbersAndStrings (PARAMS UNION TYPE)', () => {
  it('returns a number', () => {
    expect(typeof types.addNumbersAndStrings(1, 2)).toBe('number')
  })

  it('returns the sum when both parameters are numbers', () => {
    expect(types.addNumbersAndStrings(1, 2)).toBe(3)
    expect(types.addNumbersAndStrings(5, 5)).toBe(10)
  })

  it('returns the sum when both parameters are strings', () => {
    expect(types.addNumbersAndStrings('1', '2')).toBe(3)
    expect(types.addNumbersAndStrings('5', '5')).toBe(10)
  })

  it('returns the sum when one parameter is a number and the other is a string', () => {
    expect(types.addNumbersAndStrings(1, '2')).toBe(3)
    expect(types.addNumbersAndStrings('5', 5)).toBe(10)
  })
})

describe('fizzbuzz (UNION RETURN TYPE)', () => {
  it('returns a string when the parameter is divisible by 3 and/or 5', () => {
    expect(typeof types.fizzbuzz(3)).toBe('string')
    expect(typeof types.fizzbuzz(5)).toBe('string')
    expect(typeof types.fizzbuzz(15)).toBe('string')
  })

  it('returns a number when the parameter is not divisible by 3 and/or 5', () => {
    expect(typeof types.fizzbuzz(1)).toBe('number')
    expect(typeof types.fizzbuzz(2)).toBe('number')
    expect(typeof types.fizzbuzz(4)).toBe('number')
  })

  it('returns the appropriate fizz/buzz response, or original number', () => {
    expect(types.fizzbuzz(1)).toBe(1)
    expect(types.fizzbuzz(2)).toBe(2)
    expect(types.fizzbuzz(3)).toBe('fizz')
    expect(types.fizzbuzz(5)).toBe('buzz')
    expect(types.fizzbuzz(7)).toBe(7)
    expect(types.fizzbuzz(11)).toBe(11)
    expect(types.fizzbuzz(15)).toBe('fizzbuzz')
  })
})

describe('sumMatchingType (UNION TYPE PARAMS & RETURN)', () => {
  it('returns a number when both parameters are numbers', () => {
    expect(typeof types.sumMatchingType(1, 2)).toBe('number')
    expect(types.sumMatchingType(1, 2)).toBe(3)
  })

  it('returns a string when both parameters are strings', () => {
    expect(typeof types.sumMatchingType('1', '2')).toBe('string')
    expect(types.sumMatchingType('1', '2')).toBe('3')
  })

  it('returns a string when one parameter is a number and the other is a string', () => {
    expect(typeof types.sumMatchingType(1, '2')).toBe('string')
    expect(types.sumMatchingType(1, '2')).toBe('3')
  })
})

describe('getNextTrafficLightColour (UNION PARAMS & RETURN)', () => {
  it('returns the next color in the sequence', () => {
    expect(types.getNextTrafficLightColour('green')).toBe('yellow')
    expect(types.getNextTrafficLightColour('yellow')).toBe('red')
    expect(types.getNextTrafficLightColour('red')).toBe('green')
  })
})

// import * as funcs from '../files/stretch-function-type'
// import * as interfaces from '../files/stretch-extending-interfaces'
// import * as narrowing from '../files/stretch-narrowing'
// import * as generics from '../files/stretch-generics'

// describe('wait (FUNC PARAMETER)', () => {
//   it('should call the callback after the specified time', (done) => {
//     const callback = jest.fn()

//     funcs.wait(100, callback)
    
//     expect(callback).not.toHaveBeenCalled()
//     setTimeout(() => {
//       expect(callback).toHaveBeenCalled()
//       done()
//     }, 101)
//   })
// })

// describe('getIsTypeFunction (FUNC RETURNING FUNC)', () => {
//   it('should return a function', () => {
//     expect(typeof funcs.getIsTypeFunction('string')).toBe('function')
//   })

//   it('should return a function that returns a boolean', () => {
//     expect(typeof funcs.getIsTypeFunction('string')('')).toBe('boolean')
//   })

//   it('should return a function that returns true if the value is the specified type', () => {
//     expect(funcs.getIsTypeFunction('string')('')).toBe(true)
//     expect(funcs.getIsTypeFunction('number')(1)).toBe(true)
//     expect(funcs.getIsTypeFunction('boolean')(true)).toBe(true)
//     expect(funcs.getIsTypeFunction('object')({})).toBe(true)
//     expect(funcs.getIsTypeFunction('function')(() => {})).toBe(true)
//     expect(funcs.getIsTypeFunction('undefined')(undefined)).toBe(true)
//   })

//   it('should return a function that returns false if the value is not the specified type', () => {
//     expect(funcs.getIsTypeFunction('string')(1)).toBe(false)
//     expect(funcs.getIsTypeFunction('number')('')).toBe(false)
//     expect(funcs.getIsTypeFunction('boolean')({})).toBe(false)
//     expect(funcs.getIsTypeFunction('object')(() => {})).toBe(false)
//     expect(funcs.getIsTypeFunction('function')(undefined)).toBe(false)
//     expect(funcs.getIsTypeFunction('undefined')(null)).toBe(false)
//   })
// })

// describe('getVehicle', () => {
//   it('returns a Vehicle', () => {
//     expect(interfaces.getVehicle('Ford', 'F-150', 2019)).toEqual({
//       make: 'Ford',
//       model: 'F-150',
//       year: 2019,
//     })
//   })
// })

// describe('getCar, getMotorcycle, getTruck', () => {
//   it('getCars returns a Car', () => {
//     expect(interfaces.getCar('Ford', 'F-150', 2019, 4)).toEqual({
//       make: 'Ford',
//       model: 'F-150',
//       year: 2019,
//       doors: 4,
//     })
//   })
// })
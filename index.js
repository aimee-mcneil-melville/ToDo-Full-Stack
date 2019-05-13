/* eslint-disable no-console */

const {
  examplePattern1,
  examplePattern2
} = require('./patterns')

const max = 7

console.log('Example pattern 1 (max: %d)', max)
console.log(examplePattern1(max))

console.log('Example pattern 2 (max: %d)', max)
console.log(examplePattern2(max))

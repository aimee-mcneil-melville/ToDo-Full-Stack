// DOCS: https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions

// callsFunction should not return anything
// callsFunction should accept a function as a parameter and call the given function
// the given function takes no arguments and does not return a value
export function callsFunction(): void {}

// wait should not return a value, but accepts a number and a function as parameters
// it should call the function after the given number of milliseconds
export function wait(): void {}

// getIsTypeFn should accept a string as a parameter and return a function
// the returned function should accept a value (of any type) and return a boolean if
// the type of the value matches the string passed into getIsTypeFn
export function getIsTypeFn(): void {}

// getCapitaliseFn should return a function
// the returned function should accept a string and return a string with the first letter capitalised
export function getCapitaliseFn(): void {}

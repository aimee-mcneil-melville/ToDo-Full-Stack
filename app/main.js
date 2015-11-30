import R from 'ramda'

import { data, text } from './data'

// First we filter the array of strings, returning only those strings
// for which R.test(pattern, str) returns true.
// Then we pipe that array of matching strings through R.forEach,
// logging each matching string out to console separately
let matchLines = (pattern) => R.compose(
  R.forEach((str) => console.log(str)),
  R.filter((str) => R.test(pattern, str))
)(data)

let matchText = (pattern) => R.forEach(
  (str) => console.log(str),
  R.match(pattern, text)
)

// Freebie. The first one is done for you.
// Use `python -m SimpleHTTPServer 3000` to start this app up.
// Then load the page and check the console for output.

let pcode  = /^\d{4}$/
let pcodeMg = /^\d{4}$/mg

console.log("-----")
console.log("count:", matchLines(pcode).length)
console.log("-----")
console.log("count:", matchText(pcodeMg).length)

var test = require('tape')
var tapSpec = require('tap-spec')

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout)

function assert(expect, actual, msg) {
  if (typeof actual === 'undefined') {
    console.log('parameter "actual" is undefined!')
  }
  test(msg || "please add a message",  function (t) {
    t.equal(expect, actual)
    t.end()
  })
}

module.exports = assert

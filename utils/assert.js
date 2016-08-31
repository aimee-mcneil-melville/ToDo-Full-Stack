var test = require('tape')
//var htest = test.createHarness()
var tapSpec = require('tap-spec')

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout);

function assert( expect, actual, msg ) {
  test( msg || "please add a message",  function (t) {
    t.equal(expect, actual)
    t.end()
  })
}

module.exports = assert


var test = require('tape')
var request = require('supertest')
var app = require('../../server')
var fs = require('fs')
var removeWhitespace = require('../../lib/remove-whitespce')

// res.send
test('it responds with a message', function (t) {
  request(app)
    .get('/message')
    .expect(200)
    .end(function (err, res) {
      
      t.equal(res.text, 'hello')
      t.end()
    })
})

// http://expressjs.com/en/starter/static-files.html
var expectedHTML = removeWhitespace(fs.readFileSync(__dirname + '/../example.html', 'utf8'))
test('it returns an html file', function (t) {
  request(app)
    .get('/')
    .set('Accept', 'text/html')
    .expect('Content-Type', 'text/html')
    .expect(200)
    .end(function (err, res) {
      t.equal(res.body, expectedHTML, 'the body of the response is an html scaffold') 
      t.end()
    })
})

var expectedCSS = fs.readFileSync(__dirname + '/../main.css', 'utf8')
test('it returns a css file from a static directory', function (t) {
  request(app)
    .get('/main.css')
    .set('Accept', 'text/plain')
    .expect(200)
    .end(function (err, res) {
      t.equal(res.body, expectedCSS, 'the body of the response is a css file scaffold') 
      t.end()
    })
})

// res.format(), res.json() http://expressjs.com/en/4x/api.html#res.format
var expectedJSON = { message: 'hello' }
test('it returns a JSON object', function (t) {
  request(app)
    .get('/message')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      t.deepEqual(res.body, expectedJSON, 'the body of the response is a json object')
      t.end()
    })
})

// res.sendFile, req.params
var expectedFile = fs.readFileSync(__dirname + '/../test-file.txt', 'utf8')
test('it returns a specific file', function (t) {
  request(app)
    .get('/files/a-file')
    .set('Accept', 'text/plain')
    .expect(200)
    .end(function (err, res) {
      t.equal(res.body, expectedFile, 'the body of the response is the expected file')
      t.end()
    })
})

// res.render() https://github.com/ericf/express-handlebars
var expectedPage = removeWhitespace(fs.readFileSync(__dirname + '/../greeting-page.html', 'utf8'))
test('it returns a rendered html page (combining data and a template)', function (t) {
 request(app)
   .get('/greeting-page')
   .query({ firstName: 'Mickey', lastName: 'Mouse' })
   .expect(200)
   .end(function (err, res) {
     t.equal(res.body, expectedPage, 'the body of the response is a rendered html page')
     t.end()
   })
})








const supertest = require('supertest')

const app = require('../server')

test('profile 1 should be Silvia', function (done) {
  supertest(app).get('/profiles/1').end(checkProfileIsSilvia)

  function checkProfileIsSilvia(err, res) {
    expect(err).toBe(null)
    document.body.innerHTML = res.text
    const h1 = document.getElementsByTagName('h1')

    const actual = h1[0].textContent
    const expected = 'Silvia'

    expect(actual).toBe(expected)
    done()
  }
})

test('profile 2 should be Sampson', function (done) {
  supertest(app)
    .get('/profiles/2')
    .end(function (err, res) {
      expect(err).toBe(null)
      document.body.innerHTML = res.text
      const h1 = document.getElementsByTagName('h1')

      const actual = h1[0].textContent
      const expected = 'Sampson'

      expect(actual).toBe(expected)
      done()
    })
})

test('post function works', function (done) {
  supertest(app)
    .post('/named-compliment')
    .send({ name: 'alice' })
    .type('form')
    .end((err, res) => {
      expect(err).toBe(null)
      const actual = res.text
      const expected = 'You are wonderful alice'
      expect(actual).toBe(expected)
      done()
    })
})
